// Quick test to verify .env credentials are loaded
require('dotenv').config();

console.log('=== Testing Admin Credentials ===');
console.log('ADMIN_USERNAME:', process.env.ADMIN_USERNAME);
console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD ? '***' : 'NOT SET');
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
console.log('\n✅ Expected credentials:');
console.log('Username: admin');
console.log('Password: admin123');
console.log('\nIf these don\'t match, restart your server!');
