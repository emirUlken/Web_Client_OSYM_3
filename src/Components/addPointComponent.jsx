import React, { Component, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as ReactBootStrap from "react-bootstrap";
import "../tempComponent.css";
import UniList from "./uniList";
import Select from "react-select";

const URL_GET_UNIVERSITY = "http://localhost:8080/university";
const URL_GET_POINTTYPE = "http://localhost:8080/pointtype";
const URL_GET_KOSUL = "http://localhost:8080/kosulaciklama";

const requestUni = axios.get(URL_GET_UNIVERSITY);
const requestKosul = axios.get(URL_GET_KOSUL);
const requestPoint = axios.get(URL_GET_POINTTYPE);

class TempComponent extends Component {
  state = {
    type: "",
    loading: false,
    homepageFlag: false,
    pointtype_list: [],
  };

  async componentDidMount() {
    await axios.get(URL_GET_POINTTYPE)
    .then((res) => {
      this.setState({ pointtype_list: res.data, loading: true })
    })
  }

  saveFunc = () => {
    let jsonObj = {
      type: this.state.type
    };

    console.log(jsonObj)
    console.log(jsonObj)
    console.log(jsonObj)
    console.log(jsonObj)
    axios
      .post(`http://localhost:8080/pointtype`, JSON.stringify(jsonObj), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data == "OK") {
          this.setState({ toastFlag: true }, () => {
            return toast.info("EKLEME BAŞARILI!");
          });
        } else if (res.data == "FAIL") {
          this.setState({ toastFlag: false }, () => {
            return toast.info("HATA! AYNI KODA SAHİP BİR PUAN TÜRÜ MEVCUT.");
          });
        } else if (res.data == "EMPTY") {
          this.setState({ toastFlag: false }, () => {
            return toast.info("HATA! ALANLAR BOŞ BIRAKILAMAZ.");
          });
        } else {
          this.setState({ toastFlag: false }, () => {
            return toast.info(
              "HATA! TÜM PARAMETLERİ DOĞRU GİRDİĞİNİZDEN EMİN OLUNUZ."
            );
          });
        }
        console.log(res);
        console.log(res.data);
      })
      .catch(() => {
        this.setState({ toastFlag: false }, () => {
          return toast.info(
            "HATA! TÜM PARAMETLERİ DOĞRU GİRDİĞİNİZDEN EMİN OLUNUZ."
          );
        });
      });
  };

  homepageFunc = () => {
    this.setState({ homepageFlag: true });
  };

  render() {
    function changeValue(e) {
      this.setState({ uni: e.currentTarget.textContent });
    }

    if (this.state.homepageFlag) {
      return <UniList />;
    } else if (!this.state.homepageFlag && !this.state.loading) {
      return (
        <div className="spinner-parent">
          <ReactBootStrap.Spinner
            className="centered-spinner"
            animation="border"
          />{" "}
        </div>
      );
    } else if (!this.state.homepageFlag && this.state.loading) {
      return (
        <div>
          <div className="add-program">
            <h2>PUAN TÜRÜ EKLE</h2>
          </div>
          <div className="input-container">
            <h5>Puan türü:</h5>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ type: e.target.value });
              }}
            />
          </div>
          <div className="button-container">
          <ToastContainer />
            <button
              type="button"
              className="btn btn-dark"
              onClick={(e) => this.saveFunc()}
            >
              KAYDET
            </button>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => window.location.reload(false)}
            >
              GERİ DÖN
            </button>
          </div>
        </div>
      );
    }
  }
}

export default TempComponent;
