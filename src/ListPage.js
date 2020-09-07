import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const ListPage = () => {
  const [itemsCopy, setitemsCopy] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [key, setKey] = React.useState("");
  const [hasMore, setHasMore] = React.useState(true);
  const getData = () => {
    let url = `https://5f1fef1efba6d400169d4648.mockapi.io/api/employee_list`;
    return fetch(url).then((response) => response.json());
  };
  React.useEffect(() => {
    getData().then((obj) => {
      setItems(obj);
      setitemsCopy(obj);
    });
  }, []);
  const fetchMoreData = () => {
    if (itemsCopy.length >= 1000) {
      setHasMore(false);
      return;
    }
    getData().then((list) => {
      setitemsCopy(itemsCopy.concat(list));
      setItems((e) => filterme(key));
    });
  };

  const filterme = (value) => {
    let temp = itemsCopy.filter((obj) => {
      const match = new RegExp(value, "i");
      let nameMatch = obj.name.search(match);
      let designationMatch = obj.designation.search(match);
      return designationMatch !== -1 || nameMatch !== -1;
    });
    temp = temp.length ? temp : itemsCopy;
    return temp;
  };
  const handleChange = (e) => {
    setKey(e.target.value);
    setItems(filterme(e.target.value));
  };

  return (
    <div className="">
      <div className="navbar py-2 row">
        <h4>
          <i className="fa fa-user"></i> {`Contacts (1000)`}
        </h4>
        <div className="float-right">
          <div
            className="mr-2"
            style={{ width: "200px", display: "inline-block" }}
          >
            <input
              value={key}
              onChange={handleChange}
              placeholder="search by name & job title"
              className="form-control"
            />
          </div>
          <i className="fa fa-filter mx-2" />
          <Link to="/" className="btn btn-info">
            <i className="fa fa-institution mr-1" />
            Company Detail
          </Link>
        </div>
      </div>

      <div className="row">
        {items.length ? (
          <div className="col-12 list-container ">
            <InfiniteScroll
              className="row"
              dataLength={itemsCopy.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                <div className="list-loader text-primary">
                  <i className="fa fa-spin fa-spinner fa-2x m-auto" />
                </div>
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>List completed</b>
                </p>
              }
            >
              {items.length &&
                items.map((item, i) => (
                  <div className=" col-12 col-md-4" key={i}>
                    <div className="list-item">
                      <ListItem item={item} />
                    </div>
                  </div>
                ))}
            </InfiniteScroll>
          </div>
        ) : (
          <div className="list-loader col-12 text-primary text-center align-items-center">
            <i className="fa fa-spin fa-spinner fa-2x m-auto d-block" />
          </div>
        )}
      </div>
    </div>
  );
};

const ListItem = (props) => {
  const handleRevealClick = () => {
    setExpand(true);
  };
  const [expand, setExpand] = React.useState(false);
  const { item } = props;
  return (
    <>
      <div className="avatar">
        <img src="/images/avatar.png" alt="" />
      </div>
      <div className="detail">
        <h5> {item.name} </h5>
        <p className="small">
          {" "}
          <i className="fa fa-puzzle-piece" /> {item.designation}
        </p>
        {expand ? (
          <div>
            <p className="small">
              {" "}
              <i className="fa fa-envelope-o" /> {item.email}
            </p>
            <p className="small">
              {" "}
              <i className="fa fa-phone" /> {item.phone}
            </p>
          </div>
        ) : (
          <button
            className="btn btn-link mt-3 p-0"
            onClick={() => handleRevealClick()}
          >
            <i className="fa fa-lock mr-2" />
            Reveal
          </button>
        )}
      </div>
    </>
  );
};
export default ListPage;
