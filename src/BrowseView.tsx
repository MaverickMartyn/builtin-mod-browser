import { remote, webviewTag } from 'electron';
import { types, Webview, MainPage, FormInput } from 'vortex-api';
import * as s from './styles.css';
const { ListGroup, ListGroupItem, Panel, Button } = require('react-bootstrap');
import React = require("react");
import { IProps } from 'vortex-api/lib/controls/FormInput';
import { util } from "vortex-api";

const iframeStyle = { width: "100%", height: "100%" };
const addressBarStyle = {display: "flex"};

class Props {
  api: types.IExtensionApi;
}

export default class BrowseView extends React.Component {
  webView = {
    ref: null,
    currentUrl: ''
  }

  urlBar: React.Component<IProps, any, any> = null
  header: React.Component<{}, any, any> = null
  mainPage: React.Component<{}, any, any> = null

  getGame() {
    const api = (this.props as Props).api;
    const state = api.store.getState();
    const gameId = state.persistent.profiles[state.settings.profiles.activeProfileId].gameId;
    console.log(gameId);
    const nexusPage = util.nexusGameId(undefined, gameId);

    return nexusPage;
  }

  render() {
    return (
      <MainPage ref={(mainPage) => { this.mainPage = mainPage; }}>
        <MainPage.Header ref={(header) => { this.header = header; }}>
          <Button onClick={(event: React.MouseEvent<HTMLElement>) => {
            if (this.webView.ref && this.webView.ref.mNode.canGoBack) {
              this.webView.ref.mNode.goBack();
              return true;
            }
            return false;
          }}>Back</Button>
          <Button onClick={(event: React.MouseEvent<HTMLElement>) => {
            if (this.webView.ref && this.webView.ref.mNode.canGoForward) {
              this.webView.ref.mNode.goForward();
              return true;
            }
            return false;
          }}>Forward</Button>
          <Button onClick={(event: React.MouseEvent<HTMLElement>) => {
            if (this.webView.ref) {
              this.webView.ref.mNode.reload();
              return true;
            }
            return false;
          }}>Refresh</Button>
          <FormInput ref={(urlBar) => { this.urlBar = urlBar; }} className={s.addressBar} value={this.webView.currentUrl} readOnly onChange={(newValue: string) => { console.log(newValue); }}></FormInput>
        </MainPage.Header>
        <MainPage.Body>
          <Webview autoFocus={true} ref={(webView) => { this.webView.ref = webView; }} src={"https://www.nexusmods.com/" + this.getGame()} className={s.iframeStyle}></Webview>
          </MainPage.Body>
        </MainPage>
    );
  }

  componentDidMount() {
    const webview : HTMLWebViewElement = document.querySelector('webview')

    webview.addEventListener('dom-ready', () => {
      console.log('dom-ready')
      console.log(this.webView.ref.mNode.src)
      this.webView.currentUrl = this.webView.ref.mNode.src
      this.forceUpdate();
    })
  }
}