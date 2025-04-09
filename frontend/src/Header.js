//Header.js

import React from 'react';


const Header = () => {
    return (
        <header>
            <div className="logosec">
                <div className="logo">AgriScan</div>
                <img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
                    class="icn menuicn"
                    id="menuicn"
                    alt="menu-icon" />
            </div>

            <div className="searchbar">
                <input type="text"
                    placeholder="Search" />
                <div className="searchbtn">
                    <img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                        class="icn srchicn"
                        alt="search-icon" />
                </div>
            </div>

            <div className="message">
                <div class="circle"></div>
                <img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
                    class="icn"
                    alt="" />
                <div class="dp">
                    <img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                        class="dpicn"
                        alt="dp" />
                </div>
            </div>

        </header>
    );
};

export default Header;
