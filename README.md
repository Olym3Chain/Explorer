# Olym3 Explorer

Olym3 Explorer là một ứng dụng web để khám phá và theo dõi hoạt động trên mạng Olym3 Testnet. Ứng dụng cung cấp giao diện thân thiện với người dùng để xem các khối, giao dịch, địa chỉ và thống kê mạng.

## Thông tin mạng Olym3 Testnet

- **Tên mạng**: Olym3 Testnet
- **Chain ID**: 256000
- **Ký hiệu tiền tệ**: OLM
- **RPC URL**: https://rpc1.olym3.xyz/
- **Trang web chính thức**: https://www.olym3.xyz/

## Tính năng

- Xem thông tin chi tiết về các khối mới nhất
- Theo dõi các giao dịch mới nhất
- Tìm kiếm theo địa chỉ, hash giao dịch hoặc số khối
- Xem thống kê mạng theo thời gian thực
- Thêm mạng Olym3 Testnet vào MetaMask với một cú nhấp chuột

## Cài đặt và chạy

### Yêu cầu

- Node.js (phiên bản 18 trở lên)
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd Olym3Explorer

# Cài đặt dependencies
npm install
# hoặc
yarn install
```

### Chạy ứng dụng

```bash
# Chạy ở chế độ development
npm run dev
# hoặc
yarn dev

# Build và chạy ở chế độ production
npm run build
npm run start
# hoặc
yarn build
yarn start
```

## Kết nối với Olym3 Testnet

Để kết nối với mạng Olym3 Testnet, bạn có thể thêm mạng vào MetaMask bằng cách sử dụng nút "Add Olym3 Testnet to MetaMask" trên trang chủ của Explorer, hoặc thêm thủ công với các thông số sau:

- **Network Name**: Olym3 Testnet
- **RPC URL**: https://rpc1.olym3.xyz/
- **Chain ID**: 256000
- **Currency Symbol**: OLM
- **Block Explorer URL**: https://explorer1.olym3scan.xyz/

## Nhận OLM Testnet Token

Bạn có thể nhận OLM testnet token miễn phí từ faucet chính thức tại [https://faucet.olym3.xyz/](https://faucet.olym3.xyz/).

## Phát triển

Dự án này sử dụng:

- React với TypeScript cho frontend
- Express.js cho backend
- Tailwind CSS và shadcn/ui cho giao diện người dùng
- ethers.js và web3.js để tương tác với blockchain

## Giấy phép

MIT
