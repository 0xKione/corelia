let config;

let configForDevelopment = {
  baseUrl: 'http://localhost:3000',
  providers: {
    instagram: {
      name: 'instagram',
      url: '/auth/instagram',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize/',
      redirectUri: 'http://localhost:3000/welcome',
      type: '2.0',
      clientId: '216178c14e0c4ff3804c36b1b7f49317',
      popupOptions: { width: 452, height: 633 }
    }
  }
};

let configForProduction = {
  baseUrl: '',          // TODO: Fill me in
  providers: {
    instagram: {
      name: 'instagram',
      url: '/auth/instagram',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize/',
      redirectUri: 'http://richardwgomez.com',
      type: '2.0',
      clientId: '',     // TODO: Fill me in
      popupOptions: { width: 452, height: 633 }
    }
  }
};

if (window.location.hostname === 'localhost') {
  config = configForDevelopment;
} else {
  config = configForProduction;
}

export default config;
