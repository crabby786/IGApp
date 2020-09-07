import React from "react";
import { Route, Link } from "react-router-dom";

export default function Dashboard() {
  const details = {
    "Company Name": "ABB Company",
    "Primary Industry": "Electrical Equipments",
    Address: "ffgjfk 44 , zurich , dfjlj 410209 , mumbai, India",
    Revenue: "$B+",
    Phone: "+91889989889",
    "Employee Size": "10,001+",
    Website: "social.abb",
    SIC: "36 - Electronic",
    Owenership: "Carporation",
    NAICS: "335 - Electrical Equipments",
    "LinkedIn Url": "https://www.linkedin.com/company",
    "All Industry": "Manufacturing, Electrical",
    "Parent Company": "Abb Ltd",
    "All SIC": "36 - Electrical Electronics equipments"
  };
  let keys = Object.keys(details);
  const RightContent = () => {
    return (
      <>
        <button className="btn btn-info mr-2" disabled>
          <i className="fa fa-refresh mr-1" />
          Update
        </button>
        <Link to="/list" className="btn btn-info">
          <i className="fa fa-user mr-1" />
          Contacts
        </Link>
      </>
    );
  };
  return (
    <div className="">
      <div className="navbar py-2 row">
        <h4>
          <i className="fa fa-user"></i> Account Details
        </h4>
        <div className="float-right">
          <RightContent />
        </div>
      </div>

      <div className="row pb-5">
        <div className="col-12">
          <div className="d-flex align-items-center head-left mb-2">
            <div>
              <img
                src="/images/abb.png"
                style={{ height: "70px", width: "auto", maxWidth: "70px" }}
                alt="logo"
              />
            </div>
            <div className="pr-2 border-right">
              <h5>
                {details["Company Name"]}
                <i className="fa fa-linkedin-square ml-2 text-primary"></i>
              </h5>
              <div className="text-mute w-75 small"> {details.Address} </div>
            </div>
            <div className="pl-2">
              <p className="text-primary"> {details.Website} </p>
              <p> {details.Phone} </p>
            </div>
          </div>
          <div className="co-detail">
            {keys.map((value, i) => (
              <div key={i} className="detail">
                <p>{value} </p>
                <h5
                  className={
                    value === "LinkedIn Url" || value === "Website"
                      ? "text-primary"
                      : undefined
                  }
                >
                  {details[value]}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
