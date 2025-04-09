import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';
const CONTRACT_ADDRESS = "0x16C464C69286126a2BcFdCA8B6b1E8BcCBc0a86a";
const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "TenderClosed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "location",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "TenderCreated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "government",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "tenderCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tenders",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isOpen",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_deadline",
        "type": "uint256"
      }
    ],
    "name": "createTender",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "closeTender",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveTenders",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isOpen",
            "type": "bool"
          }
        ],
        "internalType": "struct Government.Tender[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const TenderApp = () => {
  const [tenders, setTenders] = useState([]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (contract) {
      fetchTenders(contract);
    }
  }, [contract]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        setContract(contractInstance);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Erreur de connexion au wallet:", error);
      }
    } else {
      alert("Installez Metamask pour interagir avec le smart contract.");
    }
  };
  const formatForContract = (value) => {
    try {
      return value.toString(); // Conversion la plus simple et universelle
    } catch (error) {
      console.error("Conversion error:", error);
      return "0"; // Valeur par défaut
    }
  };

  const fetchTenders = async (contractInstance) => {
    try {
      const activeTenders = await contractInstance.getActiveTenders();
      // Convertir les BigInt en Number pour l'affichage
      const formattedTenders = activeTenders.map(tender => ({
        ...tender,
        id: Number(tender.id), // Assurez-vous que l'id est un string
      location: tender.location,
      description: tender.description,
      deadline: Number(tender.deadline), // Assurez-vous que la deadline est un string
      isOpen: tender.isOpen
      }));
      setTenders(formattedTenders);
    } catch (error) {
      console.error("Erreur lors de la récupération des tenders :", error);
    }
  };

  const createTender = async () => {
    if (!contract || !location || !description || !deadline) {
      alert("Veuillez remplir tous les champs et vous connecter à un wallet");
      return;
    }
    
    try {
      const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);
      // Convertir en BigInt pour l'envoi au contrat
      const tx = await contract.createTender(
        location, 
        description, 
        formatForContract(deadlineTimestamp)
      );
      await tx.wait();
      alert("Tender créé avec succès !");
      fetchTenders(contract);
      // Réinitialiser le formulaire
      setLocation("");
      setDescription("");
      setDeadline("");
    } catch (error) {
      console.error("Erreur lors de la création du tender :", error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const closeTender = async (id) => {
    if (!contract) return;
    try {
      const tx = await contract.closeTender(formatForContract(id),{
        gasLimit: 300000, // Limite fixe
        
      } );
      
      await tx.wait();
      alert("Tender fermé avec succès !");
      fetchTenders(contract);
    } catch (error) {
      console.error("Erreur lors de la fermeture du tender :", error);
      let errorMessage = "Erreur inconnue";
    if (error.reason) {
      errorMessage = error.reason;
    } else if (error.data?.message) {
      errorMessage = error.data.message;
    }
    alert(`Échec de la fermeture: ${errorMessage}`);
      
    }
  };

  return (
    <div className="main">
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage tenders</h1>
      
      <div className="form-container">
  <h2>Create a new tender </h2>
  <input 
    type="text" 
    placeholder="Location" 
    value={location} 
    onChange={(e) => setLocation(e.target.value)} 
  />
  <textarea 
    placeholder="Description" 
    value={description} 
    onChange={(e) => setDescription(e.target.value)} 
    rows="4"
  ></textarea>
  <input 
    type="datetime-local" 
    value={deadline} 
    onChange={(e) => setDeadline(e.target.value)} 
  />
  <button 
    onClick={createTender} 
  >
    Create tender
  </button>
</div>


      <div className="mb-4">
        {account && (
          <p className="text-sm text-gray-600 mb-2">
            Connected with: {account.substring(0, 6)}...{account.substring(38)}
          </p>
        )}
      </div>


      <h2 className="text-xl font-bold mb-2">Tenders Actifs</h2>
      {tenders.length === 0 ? (
        <p>No active tender for the moment.</p>
      ) : (
        <ul className="space-y-4">
          {tenders.map((tender, index) => (
            <li key={index} className="border p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg"> Location {tender.location}</h3>
                  <p className="text-gray-700 mb-2">Description: {tender.description}</p>
                  <p className="text-sm">
                    <span className="font-semibold">ID:</span> {tender.id}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Deadline:</span> {new Date(tender.deadline * 1000).toLocaleString()}
                  </p>
                </div>
                {console.log(tender)}
                {tender.isOpen && (
                  <button onClick={() => closeTender(tender.id)}className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                    Close
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
  
};

export default TenderApp;