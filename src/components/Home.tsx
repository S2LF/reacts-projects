import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  NavLink,
} from 'reactstrap';

function Home(): JSX.Element {
  return (
    <div className="main-wrapper">
      <div className="m-5">
        <h1>Mes Projets React & NodeJs</h1>
      </div>

      <div className="col-8 m-auto d-flex justify-content-between">
        <Card className=" align-items-center">
          <CardBody>
            <CardTitle tag="h2">Jeu du Memory</CardTitle>
            <CardSubtitle tag="h5" className="mb-2 text-muted">
              ReactJs & NodeJs
            </CardSubtitle>
          </CardBody>
          <figure className="home_img d-flex">
            <NavLink
              tag={RouterNavLink}
              exact
              activeClassName="active"
              to="/memory"
            >
              <img
                src={`${process.env.PUBLIC_URL}/img/memory.png`}
                alt="memory"
                className="align-self-center"
              />
            </NavLink>
          </figure>
          <CardBody>
            <CardText>
              Jeu du Memory réalisé avec React pour le front et une API Node
              avec Express pour le back.
            </CardText>
            <Button
              color="primary"
              tag={RouterNavLink}
              exact
              activeClassName="active"
              to="/memory"
              className="m-1"
            >
              Tester
            </Button>
            <a
              href="https://github.com/S2LF/reacts-projects/tree/master/src/components/Memory"
              target="blanck"
              className="btn btn-secondary m-1"
            >
              Github
            </a>
          </CardBody>
        </Card>

        <Card className="align-items-center">
          <CardBody>
            <CardTitle tag="h2">Jeu du Pendu</CardTitle>
            <CardSubtitle tag="h5" className="mb-2 text-muted">
              ReactJs & l&apos;API Dicolink
            </CardSubtitle>
          </CardBody>
          <figure className="home_img d-flex">
            <NavLink
              tag={RouterNavLink}
              exact
              activeClassName="active"
              to="/pendu"
            >
              <img
                src={`${process.env.PUBLIC_URL}/img/img_pendu.png`}
                alt="pendu"
                className="align-self-center"
              />
            </NavLink>
          </figure>
          <CardBody>
            <CardText>
              Jeu du Pendu réalisé avec React pour le front et l&apos;API
              Dicolink pour la génération des mots.
            </CardText>
            <Button
              color="primary"
              tag={RouterNavLink}
              exact
              activeClassName="active"
              to="/pendu"
              className="m-1"
            >
              Tester
            </Button>
            <a
              href="https://github.com/S2LF/reacts-projects/tree/master/src/components/Pendu"
              target="blanck"
              className="btn btn-secondary m-1"
            >
              Github
            </a>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
