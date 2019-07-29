import React from 'react';
import MapPage from './Components/MapPage/MapPage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Components/Home/Home';
import { withTranslation } from 'react-i18next';
import Menu from './Components/Menu/Menu';
import BaseButton from './Components/BaseButton/BaseButton';
import mapData from './mapData.json';
import lineData from './lineData.json';
import styled, { ThemeProvider } from 'styled-components';
import withTracker from './withTracker';
import { ReactComponent as AhtiLogo } from './assets/icons/ahti_logo.svg';

export const GlobalGeoContext = React.createContext();
export const GlobalLineContext = React.createContext();

const theme = {
  secondaryColor: 'white',
  primaryColor: 'red',
  borderColor: '#ccc',
  fonts: {
    fontFamilyRegular: 'Helsinki Grotesk Regular',
    fontFamilyBold: 'Helsinki Grotesk Bold',
  },
  colors: {
    transparent: 'transparent',
    white: '#FFFFFF',
    black: '#001A33',
    pink: '#FADCE8',
    lightGray: '#E9EFF3',
  },
  borders: {
    buttonBorder: '2px solid #001A33',
  },
  shadows: {
    menuShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  gradients: {
    blockGradient:
      'linear-gradient(360deg, #DEE7ED 0%, rgba(255, 255, 255, 0) 99.98%, rgba(255, 255, 255, 0) 100%);',
    verticalBlockGradient:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 18.55%);',
  },
};

const LanguageButton = styled(BaseButton)`
  /* Make the buttons stack next to each other.
   * Might change if we make their parent a flexbox, in the future.
  */
  display: inline-block;

  padding: 0.5rem;
  font-size: 1.3rem;
  font-weight: 600;

  /* Space the buttons on the horizontal */
  &:last-of-type {
    margin-left: 0.5rem;
  }
`;

const TitleContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.15);
  border-radius: 30% / 50%;
  padding: 1.5rem;
`;

class App extends React.Component {
  render() {
    const { i18n } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <GlobalGeoContext.Provider value={mapData.features}>
          <GlobalLineContext.Provider value={lineData.data}>
            <Router>
              <Menu>
                <Link to="/">
                  <TitleContainer>
                    <AhtiLogo />
                  </TitleContainer>
                </Link>
                <div>
                  <LanguageButton onClick={() => i18n.changeLanguage('en')}>
                    en
                  </LanguageButton>
                  <LanguageButton onClick={() => i18n.changeLanguage('fi')}>
                    fi
                  </LanguageButton>
                </div>
              </Menu>
              {/* NOTE: Make sure to wrap any other Route components withTracker.
               * An alternative might be to set up a top-level route and only wrap that.
               */}
              <Route exact path="/" component={withTracker(Home)} />
              <Route path="/map" component={withTracker(MapPage)} />
            </Router>
          </GlobalLineContext.Provider>
        </GlobalGeoContext.Provider>
      </ThemeProvider>
    );
  }
}

export default withTranslation()(App);
