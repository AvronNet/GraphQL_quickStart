import React, { useState } from "react";
import NavbarContainer from "./../NavbarContainer";
import { Link, useRouter } from "./../../util/router.js";
import { useAuth } from "./../../util/auth.js";
import "./styles.scss";

function Navbar(props) {
  const auth = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavbarContainer spaced={props.spaced} color={props.color}>
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Link to="/">
                <img className="image" style={{width: '100px'}} src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAxNDAgNDMuNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlPi5zdDB7ZmlsbDojMzczYTNifS5zdDF7ZmlsbDojZjE1YzIyfTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTY4LjcgMTVjLTEuOCAwLTMuMy42LTQuNCAxLjhsLS42LTEuNUg2MHYxMy4zaDQuN3YtNy4xYzAtMS42IDEtMi42IDIuNS0yLjYgMS4yIDAgMi4xLjkgMi4xIDIuMXY3LjZINzR2LTguNGMwLTEuNS0uNS0yLjgtMS41LTMuNy0uOS0xLTIuMi0xLjUtMy44LTEuNXpNNTIuNyA5LjJoNC43djQuN2gtNC43ek01Mi43IDE1LjRoNC43djEzLjNoLTQuN3pNMTM4LjMgMTdjLTEuMi0xLjMtMi42LTItNC40LTItMS42IDAtMi45LjUtNCAxLjZsLS42LTEuMmgtMy44djE4LjloNC43di02LjVjMS4xLjggMi4yIDEuMyAzLjYgMS4zIDEuOCAwIDMuMy0uNyA0LjQtMS45IDEuMi0xLjMgMS43LTMgMS43LTUgLjEtMi4yLS41LTMuOS0xLjYtNS4yem0tNS43IDguM2MtMS40IDAtMi40LTEuMS0yLjQtMi42di0xLjRjMC0xLjUgMS0yLjYgMi40LTIuNiAxLjUgMCAyLjYgMS4zIDIuNiAzLjMgMCAxLjktMS4xIDMuMy0yLjYgMy4zek0xMjAuNiA5LjFjLTEuNSAwLTIuNyAxLjEtMi43IDIuNyAwIDEuNSAxLjIgMi43IDIuNyAyLjcgMS42IDAgMi43LTEuMiAyLjctMi43IDAtMS41LTEuMS0yLjctMi43LTIuN3pNMTE4LjIgMTUuNGg0Ljd2MTMuM2gtNC43ek05OC41IDE3Yy0xLjQtMS4zLTMuMi0yLTUuNS0yLTIuMiAwLTQgLjYtNS41IDItMS40IDEuMy0yLjEgMy0yLjEgNXMuNyAzLjcgMi4xIDVjMS41IDEuMyAzLjMgMiA1LjUgMnM0LjEtLjcgNS41LTEuOWMxLjQtMS4zIDIuMS0zIDIuMS01IDAtMi4xLS43LTMuOC0yLjEtNS4xek05MyAyNS4zYy0xLjYgMC0yLjctMS40LTIuNy0zLjMgMC0yIDEuMS0zLjMgMi43LTMuM3MyLjggMS40IDIuOCAzLjNjMCAyLTEuMiAzLjMtMi44IDMuM3pNODMuNSAxMy4yYy40IDAgLjkuMSAxLjYuMmwuNi0zLjVjLTEuMS0uMy0yLjItLjQtMy4zLS40LTEuNSAwLTIuNy40LTMuNiAxLjMtLjkuOS0xLjQgMi0xLjQgMy40djEuMmgtMi4yVjE5aDIuMnY5LjdoNC43VjE5aDIuN3YtMy42aC0yLjd2LS44YzAtLjkuNS0xLjQgMS40LTEuNHoiLz48Zz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTE0LjcgMTdjLTEuMi0xLjMtMi42LTItNC40LTItMS40IDAtMi42LjQtMy42IDEuM1Y5LjdIMTAydjE4LjloMy44bC42LTEuMmMxIDEgMi4zIDEuNiAzLjkgMS42IDEuOCAwIDMuMy0uNyA0LjQtMS45IDEuMi0xLjMgMS44LTMgMS44LTUgMC0yLjEtLjYtMy44LTEuOC01LjF6bS01LjYgOC4zYy0xLjQgMC0yLjQtMS4xLTIuNC0yLjZ2LTEuNGMwLTEuNSAxLTIuNiAyLjQtMi42IDEuNSAwIDIuNiAxLjMgMi42IDMuMyAwIDEuOS0xLjEgMy4zLTIuNiAzLjN6Ii8+PC9nPjxnPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yNS45IDE4Ljd2NS45YzAgLjctLjYgMS4yLTEuMiAxLjJoLTUuOWMtLjcgMC0xLjItLjYtMS4yLTEuMnYtNS45YzAtLjcuNi0xLjIgMS4yLTEuMmg1LjljLjcgMCAxLjIuNSAxLjIgMS4yeiIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMS45IDExLjVjLTEuNy0xLjctNS43LTIuOC0xMC4yLTIuOHMtOC41IDEuMS0xMC4yIDIuOGMtMS43IDEuNy0yLjggNS43LTIuOCAxMC4yczEuMSA4LjUgMi44IDEwLjJjMS43IDEuNyA1LjcgMi44IDEwLjIgMi44czguNS0xLjEgMTAuMi0yLjhjLjgtLjggMS41LTIuMyAyLTQgLjUtMS44LjgtMy45LjgtNi4xLS4xLTQuNi0xLjEtOC42LTIuOC0xMC4zem0tNCAxNi40Yy0uNC40LTEuNCAxLjQtNi4zIDEuNHMtNS45LTEuMS02LjMtMS40Yy0uMy0uNC0xLjMtMS40LTEuMy02LjNzMS4xLTUuOSAxLjQtNi4zYy4zLS40IDEuNC0xLjQgNi4zLTEuNHM1LjkgMS4xIDYuMyAxLjRjLjMuNCAxLjQgMS40IDEuNCA2LjNzLTEuMSA1LjktMS41IDYuM3oiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjUuOSAxOC43djUuOWMwIC43LS42IDEuMi0xLjIgMS4yaC01LjljLS43IDAtMS4yLS42LTEuMi0xLjJ2LTUuOWMwLS43LjYtMS4yIDEuMi0xLjJoNS45Yy43IDAgMS4yLjUgMS4yIDEuMnoiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjUuOSAxOC43djUuOWMwIC43LS42IDEuMi0xLjIgMS4yaC01LjljLS43IDAtMS4yLS42LTEuMi0xLjJ2LTUuOWMwLS43LjYtMS4yIDEuMi0xLjJoNS45Yy43IDAgMS4yLjUgMS4yIDEuMnoiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjUuOSAxOC43djUuOWMwIC43LS42IDEuMi0xLjIgMS4yaC01LjljLS43IDAtMS4yLS42LTEuMi0xLjJ2LTUuOWMwLS43LjYtMS4yIDEuMi0xLjJoNS45Yy43IDAgMS4yLjUgMS4yIDEuMnoiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzEuOSAxMS41Yy0xLjctMS43LTUuNy0yLjgtMTAuMi0yLjhzLTguNSAxLjEtMTAuMiAyLjhjLTEuNyAxLjctMi44IDUuNy0yLjggMTAuMnMxLjEgOC41IDIuOCAxMC4yYzEuNyAxLjcgNS43IDIuOCAxMC4yIDIuOHM4LjUtMS4xIDEwLjItMi44Yy44LS44IDEuNS0yLjMgMi00IC41LTEuOC44LTMuOS44LTYuMS0uMS00LjYtMS4xLTguNi0yLjgtMTAuM3ptLTQgMTYuNGMtLjQuNC0xLjQgMS40LTYuMyAxLjRzLTUuOS0xLjEtNi4zLTEuNGMtLjMtLjQtMS4zLTEuNC0xLjMtNi4zczEuMS01LjkgMS40LTYuM2MuMy0uNCAxLjQtMS40IDYuMy0xLjRzNS45IDEuMSA2LjMgMS40Yy4zLjQgMS40IDEuNCAxLjQgNi4zcy0xLjEgNS45LTEuNSA2LjN6Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTIxLjcgMEM5LjcgMCAwIDkuNyAwIDIxLjdjMCAxMS45IDkuNiAyMS41IDIxLjQgMjEuNyAxMi4xLjIgMjIuMi05LjkgMjItMjJDNDMuMiA5LjYgMzMuNiAwIDIxLjcgMHptMTIuNCAzNC4yYy0yLjQgMi40LTcgMy44LTEyLjQgMy44cy0xMC4xLTEuNC0xMi40LTMuOGMtMi40LTIuNC0zLjgtNy0zLjgtMTIuNHMxLjQtMTAgMy44LTEyLjRjMi40LTIuNCA3LTMuOCAxMi40LTMuOHMxMCAxLjQgMTIuNCAzLjhjMi40IDIuNCAzLjggNyAzLjggMTIuNHMtMS40IDEwLTMuOCAxMi40eiIvPjwvZz48L3N2Zz4=" alt="Infobip logo" />
                <img className="image" src="https://res.cloudinary.com/practicaldev/image/fetch/s--M5dHch5L--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn-images-1.medium.com/max/800/1%2AR6WHuWI0M9I4t-og2yNq-w.png" alt="GraphQL logo" />
                <img className="image" src="data:image/png;base64,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" alt="Hasura logo" />
                <img className="image" src="https://miro.medium.com/max/1200/1*JiTff85gB4lKHtAhykBGKQ.png" alt="Apollo logo" />
            </Link>
          </div>
          <div
            className={"navbar-burger burger" + (menuOpen ? " is-active" : "")}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={"navbar-menu" + (menuOpen ? " is-active" : "")}>
          <div className="navbar-end">
            <Link className="navbar-item" to="/">
                Todos App
            </Link>
            <Link className="navbar-item" to="/queries">
              Queries
            </Link>
            <Link className="navbar-item" to="/mutations">
              Mutations
            </Link>
            <Link className="navbar-item" to="/subscriptions">
              Subscriptions
            </Link>
          </div>
        </div>
      </div>
    </NavbarContainer>
  );
}

export default Navbar;
