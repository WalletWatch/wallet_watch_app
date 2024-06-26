from django.test import TestCase
from ..models import Asset, Wallet, Network
import json

INFURA_URL = 'https://mainnet.infura.io/v3/3c7ba8ecf29b439ab0cb11ddc4b70989'
ERC20_ABI = '''[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"decimals_","type":"uint8"}],"name":"setupDecimals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]'''

class AssetTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        Wallet.objects.create(wallet_name="test", wallet_address="0x207c7F9f6ced8bebF97CA833A28135db1D4e3FE2")
        Network.objects.create(network="ERC20", network_url=INFURA_URL, network_abi=ERC20_ABI, network_chain="eth")
        Asset.objects.create(
            asset="USDT",
            asset_address="0x990f341946A3fdB507aE7e52d17851B87168017c",
            balance=2,
            price=4,
            value=8,
            network_id=Network.objects.get(id=1),
            wallet_id=Wallet.objects.get(id=1)
        )

    def test_incorrect_data(self):
        balance = self.client.get("/api/balance/1/")
        self.assertEqual(balance.data['asset_address'], "0x990f341946A3fdB507aE7e52d17851B87168017c")     

    def test_put_balance(self):
        balance = {'track': "true", 'delta': 1}
        response = self.client.put("/api/balance/1/", data=json.dumps(balance), content_type='application/json')
        self.assertEqual(response.status_code, 204) 

        response = self.client.get("/api/balance/1/")
        self.assertEqual(response.data['track'], True) 
        self.assertEqual(response.data['delta'], 1) 

    def test_delete_balance(self):
        response = self.client.delete("/api/balance/1/")
        self.assertEqual(response.status_code, 204) 

        response = self.client.get("/api/balance/1/")
        self.assertEqual(response.status_code, 404) 