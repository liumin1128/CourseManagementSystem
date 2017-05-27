import dva from 'dva';
import { persistStore, autoRehydrate } from 'redux-persist';
import createLoading from 'dva-loading';
import './index.css';

const appInit = () => {
  console.log('ppppp');
};

// 1. Initialize
export const app = dva({
  extraEnhancers: [autoRehydrate()],
//   extraReducers:
});


app.model(require('./models/persist'));
app.model(require('./models/users'));
app.model(require('./models/course'));
app.model(require('./models/user'));

// 2. Plugins
// app.use({});
app.use(createLoading());
// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

console.log(app);

persistStore(app._store, {
  whitelist: ['user'],
});

