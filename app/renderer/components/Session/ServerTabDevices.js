// ADDED BY MO: Device Tab
import { ipcRenderer } from 'electron';
import { exec } from 'teen_process';
import path from 'path';
import log from 'electron-log';
import React, { Component } from 'react';
import { Form, Card, List } from 'antd';
import SessionStyles from './Session.css';

export default class ServerTabDevices extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isLoaded: false,
			devices: 'empty'
		};
	}
	
	componentDidMount () {
		const tab = this;
		const adbDevices = async () => {
			const adbPath = path.join(process.env.ANDROID_HOME, 'platform-tools/adb')
			log.info(`Exec '${adbPath} devices -l' command`);
			let {stdout, stderr, code} = await exec(adbPath, ['devices', '-l']);
			log.info(stdout);
			
			tab.setState({
				...tab.state,
				isLoaded: true,
				devices: stdout.split("\n")
			});
		};
		adbDevices();
	}
	render () {
		const {t} = this.props;
		const {isLoaded, devices} = this.state;

		return <Form>
		  <Form.Item>
			{!process.env.ANDROID_HOME && <Card> <p className={SessionStyles.localDesc}>{t('Edit ANDROID_HOME in configurations')} </p></Card>}
			{isLoaded && <List size="small" dataSource={devices} renderItem={item => <List.Item className={SessionStyles.localDesc}>{item}</List.Item>} />}
		  </Form.Item>
		</Form>;
		
	}
}

