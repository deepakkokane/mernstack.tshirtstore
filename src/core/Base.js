import React from "react";
import Menu from "./Menu";


const Base = (
   { title="My Title",
    description="My Description",
    className="bg-dark text-white p-4",
    children}
) => {
  return (
    <div>
        <Menu/>
      <div className="container-fluid mt-3">
        <div className="jumbotron bg-dark text-white text-center ">
            <h2 className="display-4">{title}</h2>
            <p className="lead">{ description}</p>
        </div>
       <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark  mt-auto sticky-bottom">
        <div className="container-fluid bg-success text-white text-center py-4">
            <h4>if you have any question please reach out here</h4>
            <button className="btn btn-warning btn-large">
                Contact us
            </button>
        </div>
        <div className="container">
            <span className="muted text-white">
                an Amazing MERN course
            </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
