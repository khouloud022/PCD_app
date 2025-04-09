import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
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
        "indexed": true,
        "internalType": "uint256",
        "name": "tenderId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "winner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "BidAccepted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tenderId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "bidder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "BidPlaced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
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
        "indexed": true,
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "bids",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
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
    "type": "function"
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
    "type": "function"
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
      },
      {
        "internalType": "address",
        "name": "winningBidder",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "winningBidAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tenderId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "placeBid",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tenderId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_winner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "acceptBid",
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
          },
          {
            "internalType": "address",
            "name": "winningBidder",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "winningBidAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Government.Tender[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tenderId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_bidder",
        "type": "address"
      }
    ],
    "name": "getBidAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const App = () => {
  const [tenders, setTenders] = useState([]);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [selectedTender, setSelectedTender] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [myBids, setMyBids] = useState([]);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (contract && account) {
      fetchTenders();
      fetchMyBids();
    }
  }, [contract, account]);

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
  

  const fetchTenders = async () => {
    try {
      const activeTenders = await contract.getActiveTenders();
      const formattedTenders = activeTenders.map(tender => ({
        ...tender,
        id: Number(tender.id),
        location: tender.location,
        description: tender.description,
        deadline: Number(tender.deadline),
        isOpen: tender.isOpen,
        winningBidder: tender.winningBidder,
        winningBidAmount: Number(tender.winningBidAmount)
      }));
      setTenders(formattedTenders);
    } catch (error) {
      console.error("Erreur lors de la récupération des tenders :", error);
    }
  };

  const fetchMyBids = async () => {
    try {
      const allTenders = await contract.getActiveTenders();
      const bids = [];
      
      for (const tender of allTenders) {
        const bidAmount = await contract.getBidAmount(tender.id, account);
        if (bidAmount > 0) {
          bids.push({
            tenderId: Number(tender.id),
            amount: Number(bidAmount),
            location: tender.location,
            deadline: new Date(Number(tender.deadline) * 1000).toLocaleString(),
            isOpen: tender.isOpen
          });
        }
      }
      
      setMyBids(bids);
    } catch (error) {
      console.error("Erreur lors de la récupération de vos soumissions :", error);
    }
  };
  console.log("Adresse du contrat :", contract?.address);


  console.log("Contract :", contract);
console.log("Contract address :", contract?.address);
console.log("Contract functions :", contract ? Object.keys(contract) : "Aucune fonction disponible");


const handlePlaceBid = async () => {
  if (!selectedTender || !bidAmount) {
    alert("Veuillez sélectionner un appel d'offre et entrer un montant");
    return;
  }

  try {
    // Vérification préalable des conditions
    const tenderDetails = await contract.tenders(selectedTender.id);
    if (!tenderDetails.isOpen) {
      throw new Error("Cet appel d'offre est fermé");
    }
    if (Date.now() >= tenderDetails.deadline * 1000) {
      throw new Error("La date limite est dépassée");
    }

    // Conversion et validation du montant
    const amountInWei = ethers.parseEther(bidAmount.toString());
    if (amountInWei <= 0) {
      throw new Error("Le montant doit être supérieur à 0");
    }

    // Estimation du gas avec buffer de sécurité
    const estimatedGas = await contract.placeBid.estimateGas(
      selectedTender.id, 
      amountInWei
    ).catch(err => {
      console.error("Erreur d'estimation du gas:", err);
      throw new Error("Conditions de soumission non remplies");
    });

    // Envoi de la transaction
    const tx = await contract.placeBid(selectedTender.id, amountInWei, {
      gasLimit: estimatedGas.mul(120).div(100) // 20% de buffer
    });

    const receipt = await tx.wait();
    if (receipt.status === 0) {
      throw new Error("La transaction a échoué sur la blockchain");
    }

    alert("Soumission envoyée avec succès !");
    fetchTenders();
    fetchMyBids();
    setSelectedTender(null);
    setBidAmount("");

  } catch (error) {
    console.error("Erreur détaillée:", {
      error,
      message: error.message,
      reason: error.reason,
      data: error.data
    });

    let errorMessage = "Erreur lors de la soumission";
    if (error.reason) {
      errorMessage = error.reason.replace("execution reverted: ", "");
    } else if (error.info && error.info.error) {
      errorMessage = error.info.error.message;
    } else if (error.data) {
      errorMessage = error.data.message || JSON.stringify(error.data);
    }

    alert(errorMessage);
  }
};

  return (
    <div className="main">
      <div className="searchbar">
        <input type="text" placeholder="Rechercher un appel d'offre..." />
        <button className="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Appels d'offre actifs</h3>
          <p>{tenders.length}</p>
        </div>
        <div className="stat-card">
          <h3>Mes soumissions</h3>
          <p>{myBids.length}</p>
        </div>
        <div className="stat-card">
          <h3>Compte connecté</h3>
          <p>{account ? `${account.substring(0, 6)}...${account.substring(38)}` : "Non connecté"}</p>
        </div>
      </div>

      <div className="tenders-container">
        <h2>Appels d'offre disponibles</h2>
        
        {tenders.length === 0 ? (
          <p>Aucun appel d'offre actif pour le moment.</p>
        ) : (
          <table className="tenders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Localisation</th>
                <th>Description</th>
                <th>Date limite</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((tender) => (
                <tr key={tender.id}>
                  <td>{tender.id}</td>
                  <td>{tender.location}</td>
                  <td>{tender.description}</td>
                  <td>{new Date(tender.deadline * 1000).toLocaleString()}</td>
                  <td>{tender.isOpen ? "Ouvert" : "Fermé"}</td>
                  <td>
                    <button 
                      onClick={() => setSelectedTender(tender)}
                      disabled={!tender.isOpen}
                    >
                      Soumissionner
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedTender && (
        <div className="bid-modal">
          <div className="modal-content">
            <h3>Soumissionner pour l'appel d'offre #{selectedTender.id}</h3>
            <p><strong>Localisation:</strong> {selectedTender.location}</p>
            <p><strong>Description:</strong> {selectedTender.description}</p>
            <p><strong>Date limite:</strong> {new Date(selectedTender.deadline * 1000).toLocaleString()}</p>
            
            <div className="form-group">
              <label htmlFor="bidAmount">Montant de votre soumission (ETH):</label>
              <input
                type="number"
                id="bidAmount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
            
            <div className="modal-actions">
              <button onClick={() => setSelectedTender(null)}>Annuler</button>
              <button onClick={handlePlaceBid}>Envoyer la soumission</button>
            </div>
          </div>
        </div>
      )}

      <div className="my-bids-container">
        <h2>Mes soumissions</h2>
        
        {myBids.length === 0 ? (
          <p>Vous n'avez pas encore soumissionné à un appel d'offre.</p>
        ) : (
          <table className="bids-table">
            <thead>
              <tr>
                <th>ID Appel d'offre</th>
                <th>Localisation</th>
                <th>Montant (ETH)</th>
                <th>Date limite</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {myBids.map((bid, index) => (
                <tr key={index}>
                  <td>{bid.tenderId}</td>
                  <td>{bid.location}</td>
                  <td>{ethers.formatEther(bid.amount.toString())}</td>
                  <td>{bid.deadline}</td>
                  <td>{bid.isOpen ? "En attente" : "Terminé"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;