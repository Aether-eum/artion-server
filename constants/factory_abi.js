const CollectionFactoryContract = {
  MAINNET_721_PRIVATE: '0x721DEF2bDe249A02a6C49f9Bd4022c1aa1bE549f', //FantomNFTFactoryPrivate
  MAINNET_721_PUBLIC: '0x7065D5F9DB7Ba6bd1a4aCEE07b7a037C75067ABc', //FantomNFTFactory
  TESTNET_721_PRIVATE: '0x721DEF2bDe249A02a6C49f9Bd4022c1aa1bE549f', //FantomNFTFactoryPrivate
  TESTNET_721_PUBLIC: '0x7065D5F9DB7Ba6bd1a4aCEE07b7a037C75067ABc', //FantomNFTFactory
  MAINNET_1155_PRIVATE: '0x2D221673974374d6b630ABa44a007F301aA775C0', //FantomArtFactoryPrivate
  MAINNET_1155_PUBLIC: '0x48C18Da6A6899e7817Ea75adAF70477B64059cDF', //FantomArtFactory
  TESTNET_1155_PRIVATE: '0x2D221673974374d6b630ABa44a007F301aA775C0', //FantomArtFactoryPrivate
  TESTNET_1155_PUBLIC: '0x48C18Da6A6899e7817Ea75adAF70477B64059cDF', //FantomArtFactory
  ABI: [
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'exists',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    }
  ]
};

module.exports = CollectionFactoryContract;
