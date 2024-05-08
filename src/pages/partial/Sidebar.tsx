import React, { Fragment } from 'react'
import { Navigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDashboard, faUsers, faTableList, faPercent, faUserAstronaut, faCubes, faTrophy, faSitemap, faCogs, faCaretDown, faGamepad, faGavel, faExchange, faParachuteBox, faMoneyBill, faBullhorn, faGear, faGears, faDollar, faSnowflake , faChartLine , faMedal , faTable } from '@fortawesome/free-solid-svg-icons'
import { faLanguage } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
    const location = useLocation();
    const CMS = ["/privacy-policy", "/terms-and-condition", "/help-center", "/about-us", "/faq"];
    const SETPRICE = ["/set-avatar-price", "/set-asset-price", "/settings", "/domi-coins-exchange"];
    const GAMECENTER = ["/game-center", "/free-nft"];
    const AirDrops = ["/avatar-airdrop", "/air-drop", "/airdrop-users"];
    const AssetsAirDrops = ["/asset-airdrop", "/asset-air-drop", "/asset-airdrop-users"];
    const Distribution = ["/add-partners", "/withdraw"];
    const Configuration = ["/domi-coins-exchange", "/air-drop", "/profit-distribution", "/promotion", "/avatar-whitelist", "/settings", "/set-avatar-price", "/game-rules", "/game-rules-list"];
    const toggleMenu = (id :any) => {
        let x = document.getElementById(id);
        if (x?.style.display === "none" || x?.style.display == "") {
            x.style.display = "block";
            x.style.opacity = '1';
        } else {
            x.style.display = "none";
            x.style.opacity = '0';
        }
    }
    return (
        <Fragment>
            <nav className="sidebar">
                <div className="sidebar-header">
                    <a href="#" className="sidebar-brand">
                        Dominoes<span> Panel</span>
                    </a>
                    {/* <div className="sidebar-toggler not-active">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div> */}
                </div>
                <div className="sidebar-body">
                    <ul className="nav main_nav">
                        {true &&
                            (<li className={location.pathname == "/" ? "nav-item active" : "nav-item"}>
                                <Link className="nav-link" to="/">
                                    <FontAwesomeIcon icon={faDashboard} />
                                    <span className="link-title">&nbsp;Dashboard</span>
                                </Link>
                            </li>
                            )}
                        {true&& (<li className={location.pathname == "/user-listing" ? "nav-item active" : "nav-item"}>
                            <Link className="nav-link" to="/user-listing">
                                <FontAwesomeIcon icon={faUsers} />
                                <span className="link-title">Users Management</span>
                            </Link>
                        </li>)}
                        {true && (<li className={location.pathname == "/product-management" ? "nav-item active" : "nav-item"}>
                            <Link className="nav-link" to="/product-management">
                                <FontAwesomeIcon icon={faUserAstronaut} />
                                <span className="link-title">&nbsp;Product Management</span>
                            </Link>

                        </li>)}
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
}

export default Sidebar