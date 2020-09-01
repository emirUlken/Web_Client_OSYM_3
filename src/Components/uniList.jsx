import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import * as ReactBootStrap from "react-bootstrap";
import AddDepComponent from "./addDepComponent";
import AddUniComponent from "./addUniComponent";
import AddPointComponent from "./addPointComponent";
import AddKosulComponent from "./addKosulComponent";
import InfoComponent from './infoComponent';

const URL = "http://localhost:8080/department";

class UniList extends Component {
  state = {
    items: [],
    loading: false,
    addDepFlag: false,
    addKosulFlag: false,
    addPointFlag: false,
    addUniFlag: false,
    flagInfo: false,
    flagUniList: false,
    deleteId: 0,
    dataTest: {},
  };

  async componentDidMount() {
    await axios
      .get(URL)
      .then((res) => {
          console.log(res.data)
          this.setState({ items: res.data, loading: true });
      })
      .catch(function (e) {
        console.log("ERROR ", e);
      });
  }

  addDepButton = () => {
    this.setState({ addDepFlag: true });
  };

  addKosulButton = () => {
    this.setState({ addKosulFlag: true });
  };

  addPointButton = () => {
    this.setState({ addPointFlag: true });
    console.log(this.state.addPointFlag)
  };

  addUniButton = () => {
    this.setState({ addUniFlag: true });
  };

  infoPageButtonAnonymous = data => {
    this.setState({ data:data, flagInfo: true });
  };

  render() {
    function deleteFunc(id) {
      axios.delete("http://localhost:8080/university/" + id).then((res) => {
        console.log(res);
        console.log(res.data);
      });
    }

    function infoPageButton(data) {
      this.setState({data:data ,flagInfo:true});
    }

    const length = this.state.items.length;
    if (!this.state.addDepFlag && !this.state.addPointFlag && !this.state.addKosulFlag && !this.state.addUniFlag && !this.state.flagInfo && !this.state.flagUniList && this.state.loading) {
      return (
        <div>
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th>Üniversite / Program</th>
                  <th>2019 Taban Puanı</th>
                  <th>2019 Başarı Sırası</th>
                  <th>2019 Kontenjan</th>
                  <th>2019 Doluluk Oranı</th>
                  <th>SİL</th>
                </tr>
              </thead>
            </table>
          </div>
          {/* Create table list by filling it with data from GET request made to the server */}
          <div className="tbl-content">
            <table cellPadding="0" cellSpacing="0" border="0">
              <tbody>
                {this.state.items.map((data, key) => {
                  return (
                    <tr key={key}>
                      <td>
                        <p>{data.uni.name}</p>
                        {data.name}
                      </td>
                      <td>{data.depDetails.taban}</td>
                      <td>{data.depDetails.basariSirasi}</td>
                      <td>{data.depDetails.kontenjan}</td>
                      <td>{data.depDetails.fullStatus ? "Dolu" : "Boş"}</td>
                      <td className="td-sil">
                        {/* Delete button doesn't work yet since there's a bug that prevents deleting with a foreign key. */}
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteFunc(data.id)}
                          disabled="true"
                          id={key}
                        >
                          SİL
                        </button>
                        <button
                          className="btn btn-info"
                          onClick={(e) => this.infoPageButtonAnonymous(data)}
                          id={key}
                        >
                          İNFO
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="spinner-parent">
            <button className="btn btn-warning" onClick={this.addDepButton}>
              Add Department
            </button>
            <button className="btn btn-warning" onClick={this.addUniButton}>
              Add Üniversite
            </button>
            <button className="btn btn-warning" onClick={this.addKosulButton}>
              Add Kosul Açıklama
            </button>
            <button className="btn btn-warning" onClick={this.addPointButton}>
              Add Puan Türü
            </button>
          </div>
        </div>
      );
    }

    // Check if table is loaded properly, otherwise display a spinner
    else if (!this.state.addDepFlag && !this.state.addPointFlag && !this.state.addKosulFlag && !this.state.addUniFlag && !this.state.flagInfo && !this.state.flagUniList && !this.state.loading) {
      return <div className="spinner-parent">
      <ReactBootStrap.Spinner
       className="centered-spinner"
       animation="border"
     /> </div>
    }
    
    // Navigate to different components based on which button is pressed
    else if(this.state.addDepFlag && !this.state.addPointFlag && !this.state.addKosulFlag && !this.state.addUniFlag) {
      return <AddDepComponent />;
    } else if(!this.state.addDepFlag && !this.state.addPointFlag && !this.state.addKosulFlag && this.state.addUniFlag) {
      return <AddUniComponent />;
    } else if(!this.state.addDepFlag && !this.state.addPointFlag && this.state.addKosulFlag && !this.state.addUniFlag) {
      return <AddKosulComponent />;
    } else if(!this.state.addDepFlag && this.state.addPointFlag && !this.state.addKosulFlag && !this.state.addUniFlag) {
      return <AddPointComponent />;
    } else if(this.state.flagInfo){
      return <InfoComponent data = {this.state.data} />;
    } else if(this.state.flagUniList){
      return <UniList/>;
    }
  }
}

export default UniList;
