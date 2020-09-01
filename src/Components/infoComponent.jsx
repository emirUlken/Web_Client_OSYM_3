import React, { Component, useState } from "react";
import "../infoComponent.css";
import UniList from "./uniList";

class InfoComponent extends Component {
  state = {
    homepageFlag: false,
    fullStat: "Dolu",
  };

  async componentDidMount() {
    if (this.props.data.depDetails.fullStatus == false) {
      this.setState({ fullStat: "Boş" }, () => {});
    }
    console.log(this.props);
  }

  homepageFunc = () => {
    this.setState({ homepageFlag: true });
  };

  render() {
    if (this.state.homepageFlag) {
      return <UniList />;
    } else {
      return (
        <div className="outer">
          <div className="div-main">
            <h3>
              <span class="redFont2">Bölüm: </span>
              <span class="blackFont2">{this.props.data.name}</span>
            </h3>
            <h3>
              <span class="redFont2">Üniversite: </span>
              <span class="blackFont2">{this.props.data.uni.name}</span>
            </h3>
            <h3>
              <span class="redFont2">ÖSYM Kodu: </span>
              <span class="blackFont2">{this.props.data.code}</span>
            </h3>
            <h3>
              <span class="redFont2">Öğrenim Süresi: </span>
              <span class="blackFont2">
                {this.props.data.depDetails.ogrenimSuresi}
              </span>
            </h3>
            <h3>
              <span class="redFont2">Puan Türü: </span>
              <span class="blackFont2">
                {this.props.data.depDetails.puanTuru.type}
              </span>
            </h3>
            <h3>
              <span class="redFont2">Kontenjan: </span>
              <span class="blackFont2">
                {this.props.data.depDetails.kontenjan}
              </span>
            </h3>
            <h3>
              <span class="redFont2">Okul Birinciliği Kontenjanı: </span>
              <span class="blackFont2">
                {this.props.data.depDetails.okulBirinciKontenjan}
              </span>
            </h3>
            <h3>
              <span class="redFont2">Koşul ve Açıklamalar: </span>
              <span class="blackFont2">
                <div>
                  {this.props.data.depDetails.kosulAciklama.map(function (d, idx) {
                    return <li key={idx}>{d.description}</li>;
                  })}
                </div>
                {this.props.data.kosulAciklama}
              </span>
            </h3>
            <h3>
              <span class="redFont2">Başarı Sırası: </span>
              <span class="blackFont2">
                {this.props.data.depDetails.basariSirasi}
              </span>
            </h3>
            <h3>
              <span class="redFont2">Taban Puan: </span>
              <span class="blackFont2">{this.props.data.depDetails.taban}</span>
            </h3>
            <h3>
              <span class="redFont2">Durum: </span>
              <span class="blackFont2">{this.state.fullStat}</span>
            </h3>

            <button
              type="button"
              className="btn btn-info"
              onClick={(e) => this.homepageFunc()}
            >
              GERİ DÖN
            </button>
          </div>
        </div>
      );
    }
  }
}

export default InfoComponent;
