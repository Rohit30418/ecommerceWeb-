import React, { useState } from "react";

const Navlink = ({ title, toggleDropdown, isActive, subcategories }) => {
    const [activeSubNav, setActiveSubNav] = useState(null);

    const toggleSubmenuDropdown = (submenuTitle) => {
        setActiveSubNav(activeSubNav === submenuTitle ? null : submenuTitle);
    };

    return (
        <li className="relative group">
            {!subcategories ? (
                <span>{title}</span>
            ) : (
                <>
                    <span
                        className="cursor-pointer md:hover-trigger"
                        onMouseEnter={() => toggleDropdown(title)}
                    >
                        {title} <i className="fa-solid fa-angle-down"></i>
                    </span>
                    {isActive && (
                        <div className="dropdown absolute shadow top-full bg-white text-black min-w-40 md:hidden group-hover:block">
                            <ul>
                                {subcategories.map((submenu) => (
                                    <Navlink
                                        key={submenu.id}
                                        subcategories={submenu.subcategories}
                                        isActive={activeSubNav === submenu.name}
                                        title={submenu.name}
                                        toggleDropdown={toggleSubmenuDropdown}
                                    />
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </li>
    );
};

export default Navlink;
