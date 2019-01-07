//导入CSS//import "../stylesheets/app.css";//导入web3和truffle-contract库import { default as Web3} from 'web3';import { default as contract } from 'truffle-contract'//导入Hello合约的ABI文件import RuoliCoin_artifacts from '../../build/contracts/RuoliCoin.json'//获取Hello合约对象var RuoliCoinContract = contract(RuoliCoin_artifacts);var ruoliCoinInstance = null;var accounts;var account;window.App = {
  init: function() {    //设置web3连接
    RuoliCoinContract.setProvider(web3.currentProvider);    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {      if (err != null) {
        alert("There was an error fetching your accounts.");        return;
      }      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");        return;
      }

      accounts = accs;
      account = accounts[0];
    });  


    //instance为Hello合约部署实例
    RuoliCoinContract.deployed().then(function(instance){
      ruoliCoinInstance=instance;        var event=ruoliCoinInstance.Transfer();
        event.watch(function(error,result){
          alert(error);          console.log(result);
        });
    }).catch(function(e){      console.log(e, null);
    });
  },  //封装合约中的say()方法调用过程，供javascript调用
  transfer: function(transferAddr,amount, callback){      //调用Hello合约中的say()方法，并传入参数name
      ruoliCoinInstance.sendCoin(transferAddr,amount,{from: account}).then(function(result){        //将返回结果传入回调函数
        callback(null, result);
      });
  },
  getBalance:function(balanceAddr,callback){      //调用Hello合约中的say()方法，并传入参数name
      ruoliCoinInstance.getBalance.call(balanceAddr,{from: account}).then(function(result){        //将返回结果传入回调函数
        callback(null, result);
      });
  }
};window.addEventListener('load', function() {  //设置web3连接  http://127.0.0.1:7545 为Ganache提供的节点链接
  window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  App.init();
  
});

