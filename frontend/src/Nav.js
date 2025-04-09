//Nav.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';



function Nav() {
   
    return (
        <div className="navcontainer">
            <nav className="nav">
                <div className="nav-upper-options">
                    <div className="nav-option option1">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                            className="nav-img"
                            alt="dashboard"
                        />
                        <h3>
                        <Link to="/Main" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>
                        </h3>
                    </div>

                    <div className="option2 nav-option" >
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png "
                            className="nav-img"
                            alt="tenders"
                        />
                        <h3 >
                        
                          <Link to="/publish_tender" style={{ textDecoration: 'none', color: 'inherit' }}>Publish Tender</Link>
                         </h3>

                        </div>

                    <div className="nav-option option3" >
                        <img
                            src="https://img.freepik.com/premium-vector/closed-tag-vector-illustration_1186366-62132.jpg?w=826"
                            className="nav-img"
                            alt="bids"
                        />
                        <h3> Close tender </h3>
                    </div>
                    <div className="nav-option option4" >
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                            className="nav-img"
                            alt="bids"
                        />
                        <h3> Select the best bidder </h3>
                    </div>
                    

                    <div className="nav-option option4">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                            className="nav-img"
                            alt="paiement"
                        />
                        <h3>Remunerate the bidder </h3>
                    </div>

                    <div className="nav-option option5">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                            className="nav-img"
                            alt="blog"
                        />
                        <h3>Profile</h3>
                    </div>

                    <div className="nav-option option6">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/4.png"
                            className="nav-img"
                            alt="settings"
                        />
                        <h3>Settings</h3>
                    </div>

                    <div className="nav-option logout">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                            className="nav-img"
                            alt="logout"
                        />
                        <h3>Logout</h3>
                    </div>
                </div>
            </nav>
        </div>
    );
};


export default Nav;
