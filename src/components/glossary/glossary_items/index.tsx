import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

//destructuring props into glossary
const GlossaryItems = ({glossary}) : JSX.Element => {                     
	return (
        <Accordion className="accordion">
            {glossary.map(item =>                                                                             
            <Card className="card" key={item.id}>
                <Accordion.Toggle as={Card.Header} eventKey={item.id}>
                    <Card.Title>{item.title}</Card.Title>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={item.id}>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">{item.subtitle}</Card.Subtitle>
                        <Card.Text>{item.text_quick}</Card.Text>
                        <Card.Link href={item.link}>Read More</Card.Link>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>)}
        </Accordion>
	);
}

export default GlossaryItems