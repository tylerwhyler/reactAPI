import React from "react";

export default class PortfolioManager extends React.Component {
    render() {
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <h1>
                        Column 1
                    </h1>
                </div>
                <div className="right-column">
                    <h1>
                        Column 2
                    </h1>
                </div>
            </div>
        )
    }
}