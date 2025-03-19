
# 🃏 Blackjack Game  
This is a **Blackjack Game** built with **TypeScript** and **Webpack**. The game follows standard Blackjack rules for a single player, without the option to split cards.

🔗 **[Live Demo](https://blackjack-kappa-nine.vercel.app)**  

---

## 🚀 Features
✅ Single-player blackjack game  
✅ Custom deck and card handling  
✅ Betting system with chips  
✅ Dealer AI using hit/stand strategy  
✅ Custom audio and visual effects  
✅ Fully responsive design  
✅ Clean TypeScript structure with modular components  

---

## 🎮 Gameplay Rules  
- You play against the dealer.  
- Each player is dealt two cards.  
- The goal is to get as close to **21** as possible without exceeding it.  
- Face cards (King, Queen, Jack) are worth **10 points**.  
- Aces are worth **1 or 11 points** (whichever is better for the player).  
- The dealer will stand on **17** or higher.  
- You can choose to **Hit** (draw another card) or **Stand** (keep your current hand).  
- If you exceed 21 points, you **bust** and lose the round.  
- If the dealer busts or your hand is higher than the dealer's, you win.  

---

## 🏗️ Project Structure
```
├── src
│   ├── modules
│   │   ├── audio-manager
│   │   ├── bet-manager
│   │   ├── button
│   │   ├── card
│   │   ├── chip
│   │   ├── dealer
│   │   ├── deck
│   │   ├── game
│   │   ├── modal
│   │   ├── player-seat
│   │   └── table
│   ├── abstractions
│   └── utils
├── public
│   ├── index.html
│   ├── styles
│   └── assets
├── dist
├── .github
│   └── workflows
├── .eslintrc.js
├── jest.config.js
├── tsconfig.json
├── webpack.config.js
└── README.md
```

---

## 🛠️ Tech Stack
| Tool | Description |
|-------|-------------|
| **TypeScript** | Strongly-typed language for JavaScript |
| **Webpack** | Module bundler |
| **Jest** | JavaScript testing framework |
| **SASS** | CSS preprocessor |
| **Yarn** | Dependency manager |
| **Vercel** | Deployment platform |

---

## 📦 Installation
### 1. Clone the repository:
```bash
git clone https://github.com/alexLoktievDev/blackjack.git
```

### 2. Install dependencies:
```bash
corepack enable
corepack prepare yarn@4.6.0 --activate
yarn install --immutable
```

---

## 🚀 Usage
### ✅ Start the development server:
```bash
yarn start
```

### ✅ Build for production:
```bash
yarn build
```

### ✅ Run tests:
```bash
yarn test
```

### ✅ Run tests with coverage:
```bash
yarn test:coverage
```

---

## 🧪 Testing
The project includes unit tests using **Jest** and **ts-jest**.  

### **Example Test Command:**
```bash
yarn test
```

### ✅ **Testing Components:**  
- `BetManager`  
- `AudioManager`  
- `Dealer`  
- `Card`  
- `Chip`  
- `Button`  
- `Modal`  

---

## 🌍 Deployment  
This project is deployed using **Vercel**.  

### **Manual Deployment:**
```bash
vercel --prod
```

---

## 🏆 Game Logic Overview
### ✅ Deck & Cards  
- `Deck` handles shuffling and drawing cards.  
- `Card` handles individual card rendering and flipping.  

### ✅ Player Actions  
- `Hit` – Draw another card.  
- `Stand` – End your turn and let the dealer play.  
- `Bet` – Place a bet using the chips.  

### ✅ Dealer Actions  
- Dealer automatically draws cards based on the hit strategy.  
- Dealer stands on 17 or higher.  

### ✅ Scoring & Winning  
- 21 points = **Blackjack**.  
- Busting = Lose round.  
- Higher score than dealer = **Win**.  

---

## 📁 Environment Variables
Create a `.env` file:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NODE_ENV=production
```

---

## 🚨 Linting & Formatting
- To lint the project:
```bash
yarn lint
```

- To format code:
```bash
yarn format
```

---

## ✅ GitHub Actions (CI/CD)
The project includes GitHub Actions for:  
✅ Linting  
✅ Testing  
✅ Build Verification  
✅ Coverage Reports  

### **Workflow: `.github/workflows/ci.yml`**
```yaml
- yarn lint
- yarn test
- yarn build
```

---

## ✅ Vercel Configuration
### **vercel.json:**
```json
{
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```


## ⚖️ License
This project is licensed under the **ISC** License.  

---

## 🌟 Author
👤 **[Alex Loktiev]**  
- GitHub: [@alexLoktievDev](https://github.com/alexLoktievDev)  

---

## 🎯 Game On! 😎🔥  
Ready to beat the dealer? Play now → **[Blackjack Game](https://blackjack-kappa-nine.vercel.app)**  
