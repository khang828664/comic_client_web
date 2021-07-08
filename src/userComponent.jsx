import React, { useState, useEffect } from "react";
import { Selection, Dropdown } from "react-dropdown-now";
import "react-dropdown-now/style.css";
import axios from "axios";
import { API } from "./api-config";
function UserInfo({ userData, dataComic, onChange }) {
  const [currenId, setCurrentId] = useState("");
  const [chapterIndex, setChapterIndex] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const onSubmit = async () => {
    const formData = new FormData();
    console.log(typeof file);
    console.log("submit");
    console.log(file);
    formData.append("_idComic", currenId);
    formData.append("ChapterIndex", chapterIndex);
    formData.append("Description", description);
    let a = [...file];
    a.map((item, index) => {
      formData.append(`Files`, item);
    });
    try {
      let res = await axios.post(API.UPLOADCHAPTER, formData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    change();
    console.log(currenId);
    console.log(chapterIndex);
    console.log(description);
    return () => {};
  }, [currenId]);
  const change = () => onChange();
  return (
    <div>
      <div>
        <h1>Welcome:</h1>
        <h1 style={{ color: "red" }}>
          {userData ? userData.Lastname : "lastName"}
        </h1>
      </div>
      <h3>List Comic Post:</h3>
      <div>
        <Dropdown
          baseClassName="rdn"
          className=""
          matcher={function noRefCheck() {}}
          menu="div"
          isClearable
          onChange={function noRefCheck() {}}
          onClose={function noRefCheck() {}}
          onOpen={function noRefCheck() {}}
          onSelect={({ value }) => setCurrentId(value)}
          options={dataComic.map((item, index) => {
            let value = {
              label: item.Desname,
              value: item._id,
            };
            return value;
          })}
        />
        <div>
          <div className="form" id="form">
            <p>id:{currenId}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: 10,
              }}
            >
              <div>
                <h5>Chapter index</h5>
                <input
                  type="number"
                  style={{ width: "10%" }}
                  onChange={(value) => setChapterIndex(value.target.value)}
                />
              </div>
              <div>
                <h5>Description</h5>
                <input
                  type="text"
                  style={{ width: "50%" }}
                  onChange={(value) => setDescription(value.target.value)}
                />
              </div>
              <form className="form-submit" onSubmit={onSubmit}>
                <h5>Image Chapter</h5>
                <input
                  type="file"
                  multiple
                  onChange={(value) => setFile(value.target.files)}
                />
                <button type="button" onClick={() => onSubmit()}>
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserInfo;
