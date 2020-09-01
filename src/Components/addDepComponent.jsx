import React, { Component, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Alert,
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
    name: "",
    uni: {},
    code: 0,
    puanTuru: {},
    kontenjan: 0,
    okulBirinciKontenjan: 0,
    kosulAciklama: [],
    basariSirasi: 0,
    taban: 0,
    fullStatus: false,
    loading: false,
    homepageFlag: false,
    toastFlag: false,
    dropdownOpenUni: false,
    dropdownOpenPointType: false,
    dropdownOpenKosulAciklama: false,
    dropDownValueUni: "Seçiniz",
    dropDownValuePointType: "Seçiniz",
    dropDownValueKosulAciklama: "Seçiniz",
    uni_list: [],
    kosul_list: [],
    pointtype_list: [],
    kosulOptions: [],
    selectedOptions: [],
  };

  async componentDidMount() {
    await axios.all([requestUni, requestKosul, requestPoint]).then(
      axios.spread((uniRes, kosulRes, pointRes) => {
        const tempArray = [];

        for (let i = 0; i < kosulRes.data.length; i++) {
          const kosul = kosulRes.data[i];
          tempArray[i] = { value: kosul.id, label: kosul.number };
        }

        this.setState({
          uni_list: uniRes.data,
          kosul_list: kosulRes.data,
          pointtype_list: pointRes.data,
          kosulOptions: tempArray,
          loading: true,
        });
      })
    );
  }

  saveFunc = () => {
    let tempKosulArr = [];
    let booleanFlag = false;
    this.state.selectedOptions.forEach((element) => {
      let x = { id: element.value };
      tempKosulArr.push(x);
    });

    let tempFull = true;
    if (this.state.basariSirasi === 0 || this.state.basariSirasi === "0") {
      tempFull = false;
    }

    let jsonObj = {
      name: this.state.name,
      uni: this.state.uni,
      code: this.state.code,
      depDetails: {
        puanTuru: this.state.puanTuru,
        kontenjan: this.state.kontenjan,
        ogrenimSuresi: this.state.ogrenimSuresi,
        okulBirinciKontenjan: this.state.okulBirinciKontenjan,
        kosulAciklama: tempKosulArr,
        basariSirasi: this.state.basariSirasi,
        taban: this.state.taban,
        fullStatus: tempFull,
      },
    };

    axios
      .post(`http://localhost:8080/department`, JSON.stringify(jsonObj), {
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
            return toast.info("HATA! AYNI KODA SAHİP BİR DEPARTMAN MEVCUT.");
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

    console.log(booleanFlag);
    console.log(booleanFlag);
    console.log(booleanFlag);
    console.log(booleanFlag);

    /*
    if (this.state.toastFlag) {
      return toast.info("aaaaaaaa");
    } else {
      return toast.info("bbbbbbbb");
    }
    */
  };

  homepageFunc = () => {
    this.setState({ homepageFlag: true });
  };

  toggleUni = () => {
    this.setState({
      dropdownOpenUni: !this.state.dropdownOpenUni,
    });
  };

  toggleKosulAciklama = () => {
    this.setState({
      dropdownOpenKosulAciklama: !this.state.dropdownOpenKosulAciklama,
    });
  };

  togglePointType = () => {
    this.setState({
      dropdownOpenPointType: !this.state.dropdownOpenPointType,
    });
  };

  handleUniDropdown = (uniObj, uniName) => {
    this.setState({
      uni: uniObj,
      dropDownValueUni: uniName,
    });
    console.log(this.state);
  };

  handleKosulAciklamaDropdown = (kosulIds) => {
    this.setState({
      selectedOptions: kosulIds,
    });
    console.log(this.state);
  };

  handlePointTypeDropdown = (pointObj, pointName) => {
    this.setState({
      puanTuru: pointObj,
      dropDownValuePointType: pointName,
    });
    console.log(this.state);
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
            <h2>PROGRAM EKLE</h2>
          </div>
          <div className="input-container">
            <h5>Bölüm adı:</h5>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
            <h5>Üniversite:</h5>
            <Dropdown
              isOpen={this.state.dropdownOpenUni}
              toggle={this.toggleUni}
            >
              <DropdownToggle caret>
                {this.state.dropDownValueUni}
              </DropdownToggle>
              <DropdownMenu>
                {this.state.uni_list.map((e) => {
                  return (
                    <DropdownItem
                      id={e.id}
                      key={e.id}
                      onClick={() =>
                        this.handleUniDropdown({ id: e.id }, e.name)
                      }
                    >
                      {e.name}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
            <h5>ÖSYM Kodu:</h5>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ code: e.target.value });
              }}
            />
            <h5>Öğrenim süresi:</h5>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ ogrenimSuresi: e.target.value });
              }}
            />
          </div>
          <div className="input-container">
            <h5>Puan türü:</h5>
            <Dropdown
              isOpen={this.state.dropdownOpenPointType}
              toggle={this.togglePointType}
            >
              <DropdownToggle caret>
                {this.state.dropDownValuePointType}
              </DropdownToggle>
              <DropdownMenu>
                {this.state.pointtype_list.map((e) => {
                  return (
                    <DropdownItem
                      id={e.id}
                      key={e.id}
                      onClick={() =>
                        this.handlePointTypeDropdown({ id: e.id }, e.type)
                      }
                    >
                      {e.type}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
            <h5>Kontenjan:</h5>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ kontenjan: e.target.value });
              }}
            />
            <h5>Okul birinciliği kontenjanı:</h5>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ okulBirinciKontenjan: e.target.value });
              }}
            />
            <h5>Koşul ve açıklamalar:</h5>
            <Select
              placeholder="SEÇ"
              className="select"
              isMulti={true}
              options={this.state.kosulOptions}
              onChange={this.handleKosulAciklamaDropdown}
            />
          </div>
          <div className="input-container">
            <h5>Başarı sırası:</h5>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ basariSirasi: e.target.value });
              }}
            />
            <h5>Taban puan:</h5>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ taban: e.target.value });
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
