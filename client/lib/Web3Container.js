import React from 'react';
import getWeb3 from './getWeb3';
import getAccounts from './getAccounts';
import getContract from './getContract';
import contractDefinition from '../../build/contracts/SimpleStorage.json';
import OpenBountyDefinition from '../../build/contracts/OpenBounty.json';


export default class Web3Container extends React.Component {
	state = { web3: null, accounts: null, contract: null, OBContract: null };

	async componentDidMount () {
		try {
			const web3 = await getWeb3();
			const accounts = await getAccounts(web3);
			const contract = await getContract(web3, contractDefinition);
			const OBContract = await getContract(web3, OpenBountyDefinition);
			this.setState({ web3, accounts, contract, OBContract });
		} catch (error) {
			alert(`Failed to load web3, accounts, or contract. Check console for details.`);
			console.log(error);
		}
	}

	render () {
		const { web3, accounts, contract, OBContract } = this.state;
		return web3 && accounts
		? this.props.render({ web3, accounts, contract, OBContract })
		: this.props.renderLoading();
	}
}
