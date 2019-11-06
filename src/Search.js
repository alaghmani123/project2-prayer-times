import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
function Search() {
    return (
        <Router>

            <nav>
                <Link to="/Search">Search</Link>

            </nav>

            <div>

                <Route path="/Search" component={Search} />

            </div>

        </Router>
    );
}

export default Search;
