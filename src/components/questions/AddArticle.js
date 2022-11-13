import React, { useEffect, useRef, useState } from "react";
import "./Questions.scss";
import { Editor } from "@tinymce/tinymce-react";
import { WithContext as ReactTags } from "react-tag-input";
import UploadHeroImage from "./upload-to-cloud";
import { create, CID } from "ipfs-http-client";
import { prototype } from "stream";
import membericon from "./group.png";
import staticon from "./stats.png";
import { connect } from "@tableland/sdk";
import Sidebar from "./Sidebar";
import axios from "axios";
// import { url } from 'inspector';
// import { url } from 'inspector';

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];
const AddArticle = ({ mainContract }) => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
    console.log(tag);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const [heroImg, setHeroImage] = useState(null);

  async function DataStoring() {
    if (editorRef.current) {
      console.log(title);
    }
    console.log(editorRef.current.getContent());

    //nft storage
    const client = create("https://ipfs.infura.io:5001/api/v0");
    const StringTitle = JSON.stringify(title);
    const Stringtags = JSON.stringify(tags);
    const question = {
      tile: StringTitle,
      body: editorRef.current.getContent(),
      tags: Stringtags,
    };

    //------------------------------------------------------------------------------------------------------------------//
    const options = {
      method: 'POST',
      url: 'https://api.nftport.xyz/v0/metadata',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '4455109c-4819-40f5-9ec5-5882af32a7ed'
      },
      data: {
        name: "'" + StringTitle + "'",
        description: "'" + editorRef.current.getContent() + "'",
        file_url: "'" + Stringtags + "'",
        bhadresh: 'developer'
      }
    };
    await axios.request(options).then(function (response) {
      console.log(response.data);
      // console.log(response.data.ipfs_url);
      // imageUri = response.data.ipfs_url;
    }).catch(function (error) {
      console.error(error);
    });

    //------------------------------------------------------------------------------------------------------------------//


    // const { cid } = await client.add(JSON.stringify(question));
    // const articleCID = cid._baseCache.get("z");
    // console.log(articleCID);
    // console.log(title);
    // let articleTags = [];
    // for (let i = 0; i < tags.length; i++) {
    //   articleTags[i] = tags[i]["text"];
    // }
    // console.log(articleTags);
    // const tx = await mainContract.addArticle(
    //   title,
    //   articleCID,
    //   uploadImage,
    //   articleTags
    // );
    // await tx.wait();

    // try {
    //   const tableland = await connect({ network: "testnet", chain: "polygon-mumbai" });
    //   const writeRes = await tableland.write(`INSERT INTO ArticleTitle_80001_621 (cid, title) VALUES (${questionCID}, ${StringTitle});`);
    //   console.log("Data inserted successfully...");
    // }
    // catch (e) {
    //   console.log("Error inserting data into TABLELAND:",String(e));
    // }
  }

  // function for uploading hero image
  const client = create("https://ipfs.infura.io:5001/api/v0");
  const [uploadImage, setUploadedImage] = useState("No Image Found");
  const heroImage = useRef(null);
  function reset() {
    setHeroImage(null);
  }
  async function UploadImage(e) {
    const file = e.target.files[0];
    console.log(file);
    setHeroImage(file);

    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setUploadedImage(url);
      console.log(url);
      console.log(uploadImage);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  return (
    <>
      <div className="main">
        <div className="left-section">
          <div className="question_heading">Add the artical</div>
          <div className="Question_fields">
            <div className="title">
              <div className="title-heading">Title</div>
              <div className="title_instruction">
                Be spacific and Imagine you are asking writing article to
                someone
              </div>
              <div className="title_textfield">
                <input
                  type="text"
                  className="input_title"
                  placeholder="Enter Title of Article here"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="featured-image">
              {heroImg ? (
                <>
                  <img src={uploadImage} className="uploaded_image" />
                  <button
                    onClick={(e) => {
                      reset();
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <div
                  onClick={(e) => {
                    heroImage.current.click();
                  }}
                >
                  <UploadHeroImage />
                </div>
              )}
            </div>
            <input
              type="file"
              name="hero-image"
              className="aa_input-featured-image"
              ref={heroImage}
              onChange={(e) => {
                UploadImage(e);
              }}
              hidden
            />
            <div className="body">
              <div className="body_title">Body</div>
              <div className="body_instruction">
                Include all information someone would need to know from this
                article.
              </div>
              <div className="body_textfield">
                <input
                  id="my-file"
                  type="file"
                  name="my-file"
                  style={{ display: "none" }}
                  onChange=""
                />

                <Editor
                  apiKey=""
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | image",
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: "image",
                    file_picker_callback: function (callback, value, meta) {
                      if (meta.filetype == "image") {
                        var input = document.getElementById("my-file");
                        input.click();
                        input.onchange = function () {
                          var file = input.files[0];
                          var reader = new FileReader();
                          reader.onload = function (e) {
                            console.log("name", e.target.result);
                            callback(e.target.result, {
                              alt: file.name,
                            });
                          };
                          reader.readAsDataURL(file);
                        };
                      }
                    },
                    paste_data_images: true,

                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  // tinymce.init({
                  //     selector: 'textarea',  // change this value according to your HTML
                  //     plugins: 'image',
                  //     toolbar: 'image',
                  //     image_list: [
                  //       { title: 'My image 1', value: 'https://www.example.com/my1.gif' },
                  //       { title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif' }
                  //     ]
                  //   });
                />
              </div>
            </div>
            <div className="tag">
              <div className="tag_title">Tags</div>
              <div className="tag-input">
                <ReactTags
                  tags={tags}
                  delimiters={delimiters}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleTagClick={handleTagClick}
                  inputFieldPosition="inline"
                  autocomplete
                />
              </div>
            </div>
            <div className="submit-btn-parent">
              <button className="submit-btn" onClick={DataStoring}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <Sidebar mainContract={mainContract} />
      </div>
    </>
  );
};

export default AddArticle;
