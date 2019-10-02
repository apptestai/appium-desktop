// ADDED BY MO: Device Tab
import log from 'electron-log';
import React, { Component } from 'react';
import { Form, Card, List, Row, Col, Button } from 'antd';
import SessionStyles from './Session.css';

export default class ServerTabDevices extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isLoaded: false,
			devices: []
		};
		this.androidHome = null;		
	}
	
	componentWillMount () {
		const {getEnvironmentVariables, setListOfdevicesAttached} = this.props;
		(async () => {
			await getEnvironmentVariables();
			await setListOfdevicesAttached();
		})();
	}
	
	render () {
		const {t, listOfdevicesAttached, envVariables} = this.props;
		const hasADBPath = !!envVariables && !!envVariables['ANDROID_HOME'];
		
		return (
			<Form>
				{!hasADBPath &&  <Row key="hidden"><Col span={24}><Form.Item><Card><p className={SessionStyles.localDesc}>{t('Edit ANDROID_HOME in configurations')} </p></Card></Form.Item></Col></Row>}
				<Row key="deviceList">
					<Col span={24}>
						<Form.Item>
							<List className={SessionStyles.deviceList} dataSource={listOfdevicesAttached} renderItem={item => (
								<List.Item className={SessionStyles.localDesc}>{item}</List.Item>
							)} />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		);		
	}
}

