# Ton Connect Wallet Information Generator

This script generates **wallet information** and a **connection proof** required for connect wallets with **Ton Connect**. 

## Features
- Generates a **TON wallet** if no existing seed phrase is provided.
- Produces a **proof object** to validate wallet ownership for Ton Connect integration.
- Automatically handles manifest data and payloads.

## Installation

1. Clone the repository or copy the script.
2. Ensure Node.js is installed (LTS recommended).
3. Install the required dependencies:

   ```bash
   npm install
   ```

## Usage

Run the script with the following command:

```bash
node generator.cjs <manifest.url> <payload> <seed (optional)>
```

### Parameters:
- `<manifest.url>`: URL from the **Ton Connect manifest**, which specifies app's identity and metadata.
- `<payload>`: Optional payload data. Use `n0t1requ1red` if no payload is required.
- `<seed (optional)>`: An optional seed phrase (24 words) for an existing wallet. If omitted, a new wallet will be created.

### Example Manifest

A manifest contains metadata about app. For example:

```json
{
  "url": "https://example.com",
  "name": "Example App",
  "iconUrl": "https://example.com/logo.png"
}
```

In this case, use `https://example.com` as the `<manifest.url>` parameter.

### Example Commands

1. **Create a new wallet and generate proof:**
   ```bash
   node generator.cjs https://example.com n0t1requ1red
   ```

2. **Use an existing wallet:**
   ```bash
   node generator.cjs https://example.com your-payload "word1 word2 word3 ... word24"
   ```

## Output

The script generates a JSON object with wallet information and a connection proof. Example:

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
> This tool uses **v3R1 wallet addresses**, which may not be visible by default in some versions of Tonkeeper.  
> 
> To access these addresses:  
> - **Desktop/Web**: Go to **Settings > Current Address** and add all versions.  
> - **Mobile**: Previous wallet versions can be added during wallet import if they have a balance. Tonkeeper will prompt you to select versions to import.

## Dependencies
- [tweetnacl](https://www.npmjs.com/package/tweetnacl)
- [tweetnacl-util](https://www.npmjs.com/package/tweetnacl-util)
- [tonweb](https://www.npmjs.com/package/tonweb)
- [ton-crypto](https://www.npmjs.com/package/ton-crypto)
- [int64-buffer](https://www.npmjs.com/package/int64-buffer)