# Ton Connect Wallet Information Generator

This Python script generates **wallet information** and a **connection proof** required for connecting wallets with **Ton Connect**.

> README for Node.js available [here](README-js.md)

## Features
- Generates a **TON wallet** if no existing mnemonic is provided.
- Produces a **proof object** to validate wallet ownership for Ton Connect.
- Automatically handles manifest data and payloads.

## Installation

1. Clone the repository or copy the script.
2. Ensure Python 3.10 is installed on your system.
3. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

## Usage

Import the `proof` function from the `generator` module and call it:

```python
from generator import proof

result = await proof(manifest_url="<manifest.url>", payload="<payload>", mnemonic="<mnemonic (optional)>")
```

### Parameters:
- `<manifest.url>`: URL from the **Ton Connect manifest**, which specifies the app's identity and metadata.
- `<payload>`: Optional payload data. Use `None` if no payload is required. If `None` is passed, the payload is excluded from the generated proof.
- `<mnemonic (optional)>`: An optional mnemonic (24 words) for an existing wallet. If omitted, a new wallet will be created.

### Example Manifest

A manifest contains metadata about the app. For example:

```json
{
  "url": "https://example.com",
  "name": "Example App",
  "iconUrl": "https://example.com/logo.png"
}
```

In this case, use `example.com` as the `<manifest.url>` parameter.

### Example Code

1. **Create a new wallet and generate proof (with no payload):**

   ```python
   from generator import proof

   result = await proof("example.com", None)
   print(result)
   ```

2. **Use an existing wallet (with a provided payload):**

   ```python
   from generator import proof

   result = await proof("example.com", "your-payload", "word1 word2 word3 ... word24")
   print(result)
   ```

## Output

The function generates a JSON object with wallet information and a connection proof. Example:

```json
{
    "wallet": {
        "mnemonics": "word1 word2 word3 ... word24",
        "ton_address": "UQ...8OtxN"
    },
    "address": "0:abcdef123...377c3a",
    "network": "-239",
    "public_key": "627c551...dcb67",
    "private_key": "dbcb5077605...adbf85e641747bf",
    "proof": {
        "name": "ton_proof",
        "timestamp": 1690000000,
        "domain": {
            "lengthBytes": 11,
            "value": "example.com"
        },
        "signature": "fJqmtpUWO...sGhiYjubDg==",
        "payload": "your-payload",
        "state_init": "te6cckE...AGVgg=="
    }
}
```

### Explanation:
- **wallet**: Contains the mnemonic (seed phrase) and TON address in a readable format.
- **address**: Raw TON address with workchain info.
- **network**: The network ID (`-239` for mainnet and `-1` for testnet).
- **proof**:
  - **domain**: The app domain extracted from the manifest.
  - **signature**: Digital signature proving ownership of the wallet.
  - **state_init**: Initialization data for the wallet.

> [!WARNING]  
> This tool uses **v4R2 wallet addresses**.

## Dependencies
- [tonsdk](https://pypi.org/project/tonsdk/)
- [nacl](https://pypi.org/project/pynacl/)
- [base64](https://docs.python.org/3/library/base64.html)
- [hashlib](https://docs.python.org/3/library/hashlib.html)
- [time](https://docs.python.org/3/library/time.html)
