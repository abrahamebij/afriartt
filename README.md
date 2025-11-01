# 🎨 AfriArtt: The Decentralized African Art Marketplace

**AfriArtt** is a decentralized NFT marketplace built on the **Hedera Hashgraph** network, dedicated to empowering African digital artists. We merge cultural authenticity with modern Web3 infrastructure, providing a transparent, global platform for artists to tokenize their work and earn automated royalties.

<img width="1350" height="593" alt="image" src="https://github.com/user-attachments/assets/dd247c4b-8b55-4da5-b7af-656d66b0b90e" />


## 🛑 Problem Statement: The Erosion of African Cultural Heritage

The most pressing challenge facing African art today is the **accelerated erosion of traditional cultural practices**—including ancestral sculptures, ritual paintings, and historical writings. These art forms are rapidly *dying out* due to:

1.  **Generational Disconnect:** Knowledge transfer has broken down, leaving newer generations without the skills, context, or incentive to continue these ancient practices.
2.  **Lack of Visibility:** Traditional cultural art lacks a modern, global platform to gain recognition, appreciation, and sustained financial value, making it difficult for artists and custodians to justify their preservation.
3.  **Digital Inaccessibility:** Valuable traditional artworks and their stories are not digitized, leaving them vulnerable to decay, loss, and permanent cultural amnesia in the modern world.

**AfriArtt exists to stop this cultural erosion. We use Web3 technology to create a digital, immutable link to the past, offering new life, global visibility, and financial sustainability to the stewards of African cultural heritage.**

## 🚀 Live Demo & Project Assets

| Asset                          | Link                                                                                                                                               |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Deployed Application**       | [https://afriartt.vercel.app/](https://afriartt.vercel.app/)                                                                                       |
| **Pitch Deck / Presentation**  | [https://gamma.app/docs/AfriArtt-h5fr0evi7pl2jct](https://gamma.app/docs/AfriArtt-h5fr0evi7pl2jct) |
| **Hedera Certification** | [https://certs.hashgraphdev.com/08df8a77-376d-4d49-9dd9-8cc3583a4be9.pdf](https://certs.hashgraphdev.com/08df8a77-376d-4d49-9dd9-8cc3583a4be9.pdf) |

-----

## ✨ Key Features (The MVP Showcase)

We focused on delivering the core loop: **Wallet Authentication $\rightarrow$ Minting $\rightarrow$ Discovery $\rightarrow$ Sale**, all powered by Hedera's efficiency.

| Feature                     | Description                                                                                                                                           |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dual Authentication**     | Users can log in using either traditional **Email/Password** or their **HashPack Wallet** via a custom verification process, unifying their identity. |
| **NFT Minting (Protected)** | Artists use a protected route to upload assets, set title, description, and the **Hedera Royalty Percentage**.                                        |
| **Decentralized Storage**   | Artwork metadata and files are securely stored on **IPFS** via NFT.storage, ensuring long-term decentralized provenance.                              |
| **Explore Marketplace**     | Responsive grid display of all available NFTs, featuring search functionality and filtering by crucial **Cultural Tags**.                             |
| **NFT Detail Drawer**       | Sliding detail panel (`Framer Motion`) showing the full artwork, creator, price, and purchase/transaction options.                                    |
| **Hedera Transactions**     | Integration with the **Hedera SDK** for gas-efficient minting and peer-to-peer sale/transfer of NFTs.                                                 |

-----

## 🛠️ Technology Stack

| Component              | Technology                           | Why We Chose It                                                                                              |
| :--------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| **Frontend**           | **Next.js, TypeScript, TailwindCSS** | Modern, server-rendered framework for speed and scalability, utilizing utility-first styling.                |
| **Blockchain**         | **Hedera Hashgraph**                 | Ultra-low, predictable gas fees, high speed, and native token service (HTS) for cost-effective NFTs.         |
| **Backend/DB**         | **Supabase (PostgreSQL)**            | Streamlined developer experience with a robust SQL database, native authentication, and instant REST APIs.   |
| **Wallet Integration** | **HashConnect**                      | The standard library for connecting dApps to Hedera wallets like HashPack for secure transaction signing.    |
| **Storage**            | **IPFS (via NFT.storage)**           | Ensures immutable, decentralized storage of all artwork files, linking the file hash to the NFT metadata.    |
| **UI/UX**              | **Framer Motion**                    | Used for smooth page transitions and the signature sliding NFT Detail Drawer, enhancing the user experience. |

-----

## 🎨 Data Schema Highlights (Supabase Tables)

Our PostgreSQL schema is designed to unify user identity across both the traditional Auth system and the Web3 wallet address.

| Table              | Key Attribute     | Relationship & Purpose                                                                                                  |
| :----------------- | :---------------- | :---------------------------------------------------------------------------------------------------------------------- |
| **`artists`**      | `user_id` (UUID)  | **Unified ID:** Links the Supabase Auth `user_id` to the `hedera_account_id` (wallet) and stores all profile metadata.  |
| **`nfts`**         | `hedera_token_id` | Stores all artwork metadata and unique Hedera/IPFS identifiers. Uses `user_id` as a Foreign Key to the `artists` table. |
| **`transactions`** | `hedera_tx_hash`  | Records on-chain sales, tracking the buyer/seller `user_id`s, sale price, and automated royalty distribution.           |

-----

## 🎯 Value Proposition

### For Artists

  * **Global Reach:** Showcase African digital art to a worldwide audience.
  * **Automated Royalties:** Retain a set percentage of all future resales, enforced transparently by the Hedera Token Service.
  * **Low Cost Barrier:** Leverage Hedera's low fees to make minting and trading highly accessible.

### For Collectors

  * **Verified Provenance:** Enjoy transparent, on-chain ownership history for unique African digital art.
  * **Secure Trading:** All transactions are fast, low-cost, and validated by the Hedera network.

-----

## 🤝 Getting Started (Local Development)

1.  **Clone the repository:**
    ```bash
    git clone [REPO URL]
    cd AfriArtt
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Setup Environment Variables:**
    Create a `.env.local` file with your Supabase and Hedera credentials.
    ```env
    # Supabase Credentials (Public)
    NEXT_PUBLIC_SUPABASE_URL=...
    NEXT_PUBLIC_SUPABASE_ANON_KEY=...

    # Hedera Credentials (Operator Account for Minting/TX Fees - Must be kept secure)
    HEDERA_OPERATOR_ID=...
    HEDERA_OPERATOR_KEY=...
    HEDERA_NETWORK="testnet" # Or mainnet
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view the application.

-----

## 📜 License

This project is open-source and available under the **MIT License**.
