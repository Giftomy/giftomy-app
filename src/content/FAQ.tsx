import ExternalLink from '@/components/ExternalLink';
import Routes from '@/lib/constants/Routes';
import links from '@/lib/constants/links';


const faqContent = {
  General: [
    {
      question: 'What is Blockchain?',
      answer: (
        <>
          In simple terms, a blockchain is a method of storing and transferring
          information. It can be considered a kind of database that is not
          stored in a single computer. Instead, many identical copies are
          distributed in several computers called nodes. Information on a
          blockchain is stored in a continuous chain of blocks with each block
          containing essential information (for example, transactions) and the
          cryptographic hash of the previous block. To change the information in
          any block, you have to make changes to all subsequent blocks. The
          content of the blocks is verified by the consensus of all nodes in the
          network. These two features makes it very difficult to alter any
          information already included in the blocks, and this difficulty
          increases with the number of nodes in the network.
        </>
      ),
    },
    {
      question: 'What is Ethereum?',
      answer: (
        <>
          "It's the world's programmable blockchain. Ethereum builds on
          Bitcoin's innovation, with some big differences. Both let you use
          digital money without payment providers or banks. But Ethereum is
          programmable, so you can also use it for lots of different digital
          assets – even Bitcoin! This also means Ethereum is for more than
          payments. It's a marketplace of financial services, games and apps
          that can't steal your data or censor you." <br />
          <br /> From{' '}
          <ExternalLink
            href='https://ethereum.org/en/what-is-ethereum/'
            title='Ethereum.org'
          />{' '}
          website
        </>
      ),
    },
    {
      question: 'What is Tor.us?',
      answer: (
        <>
          Tor.us is the non-crypto savvy way to sign in to, and use Giftomy.xyz.
          It is our wallet option alongside{' '}
          <a
            href='https://metamask.io/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Metamask
          </a>
          . For a more detailed answer, see{' '}
          <a
            href='https://docs.tor.us'
            target='_blank'
            rel='noopener noreferrer'
          >
            Tor.us documentation
          </a>
          .{' '}
        </>
      ),
    },
    {
      question: 'What is the difference between Bitcoin and Ethereum?',
      answer: (
        <>
          Bitcoin is intended to function as decentralized means of value
          transfer whereas Ethereum is a protocol that allows users to develop
          decentralized applications on top of a blockchain network. As
          prominent Ethereum developer Vlad Zamfir has confirmed on several
          occasions, Ethereum is “not money.” Ethereum’s native token, Ether
          (ETH) exists in order to facilitate the process of building and
          deploying distributed applications. Meanwhile, the Bitcoin currency
          exists on the Bitcoin blockchain to facilitate peer-to-peer (P2P)
          exchange of uncensorable, non-confiscatable money.
          <br />
          <br /> From{' '}
          <a
            href='https://www.cryptocompare.com/coins/guides/what-s-the-difference-between-bitcoin-btc-and-ethereum-eth'
            target='_blank'
            rel='noopener noreferrer'
          >
            cryptocompare.com
          </a>
          .
        </>
      ),
    },
    {
      question: 'Why donate cryptocurrency?',
      answer: (
        <>
          Cryptocurrency knows no borders and marginalizes no one. It can not be
          taken from you if you alone hold your keys. Another advantage: When
          you donate with crypto, you do not realize capital gains from the
          crypto you hold, and you can deduct it from your taxes. In other
          words, donating your crypto can often reduce your tax burden. Would
          you rather donate to the tax agency or your favorite cause?
        </>
      ),
    },
    {
      question: 'Does the IRS recognize cryptocurrency donations?',
      answer: (
        <>
          The IRS classifies cryptocurrencies as property, so cryptocurrency
          donations to 501c3 organizations receive the same tax treatment as
          stocks.
        </>
      ),
    },
  ],
};

export default faqContent;