import {hot} from 'react-hot-loader/root';
import React, {Component} from "react";

import styles from "../style/App.module.css"
import Header from "./Header";
import Aside from "./Aside";
import Maintenance from "./Maintenance";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    this.setState(() => {
      return {
        data: [],
        loaded: true
      };
    });
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.content}>
          <Header/>
          <Aside/>
          <Maintenance/>
        </div>
      </div>
    );
  }
}

export default hot(App);
