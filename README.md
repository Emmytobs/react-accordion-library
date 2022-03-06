# react-accordion-library

A fully-featured, composable and extendable React accordion library.

#### Note: This package was built using the react hooks API introduced in React 16, which means react versions prior to that are not compatible with this package.

# Documentation

There are four components that can be used to create custom accordions. Starting from top to bottom:

- Accordion
- AccordionItem
- Title
- Content

## Accordion

The `Accordion` component is the top-level component. It provides a wrapper around the `AccordionItem` component.

```javascript
import { Accordion } from "react-accordion-library";
function CustomAccordion() {
  return (
    <Accordion>
      {/*
                ....
            */}
    </Accordion>
  );
}
```

## AccordionItem

The `AccordionItem` component is the direct child under `Accordion` component. You must have at least one `AccordionItem` component nested within the top-level Accordion component, else you will get an error.
The `AccordionItem` component is designed using the render props approach of react component design. It takes a function as its direct child which is called in the Accordion component and passed an argument `contentIsVisible`, and returns some JSX. The argument has a boolean value and it represents a piece of state that tells the AccordionItem whether it has been clicked on or not, which tells the component to collapse the `Content` or not to. This also means you can also use the `contentIsVisible` argument to implement certain visual cues when the accordion item has been collapsed or not. For example, you can set an arrow icon to point upwards or downwards depending on the whether the content is visible (or is unfolded) or not visible (or is collapsed)

Example:

```javascript
import { Accordion, AccordionItem } from "react-accordion-library";
function CustomAccordion() {
  return (
    <Accordion>
      <AccordionItem>
        {(contentIsVisible) => {
          return <>{/* Some JSX */}</>;
        }}
      </AccordionItem>
    </Accordion>
  );
}
```

You can put anything within the return of the function nested within AccordionItem as you deem fit for your use case. But to get the actual accordion functionality, you will need two child components under `AccordionItem`: `Title` and `Content`

## Title

The `Title` component is nested within the return of the function under AccordionItem. It represents the visible part of the accordion when an accordion item has been collapsed. You can put any JSX within the opening and closing tags

Example:

```javascript
<AccordionItem>
  {(contentIsVisible) => {
    return (
      <>
        <Title>
          <div>
            <p>Our mission</p>
          </div>
        </Title>
      </>
    );
  }}
</AccordionItem>
```

## Content

The `Content` component is also nested within the return of the function under AccordionItem. It represents the collapsible part of the accordion item. Hence, it is hidden when an item is collapsed.

Example:

```javascript
<AccordionItem>
  {(contentIsVisible) => {
    return (
      <>
        <Title>
          <h1>Our mission</h1>
        </Title>
        <Content>
          <p>
            Our mission is to be Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Officiis atque quam laboriosam est sint animi
            reprehenderit repudiandae debitis dolores natus!
          </p>
        </Content>
      </>
    );
  }}
</AccordionItem>
```

A full example of an accordion built using this package is shown below:

```javascript
import { Accordion, AccordionItem, Title, Content } from "react-accordion-library";
import arrowUp from "./arrow-up-icon.png"

function CustomeAccordion() {
    return (
      <Accordion>
        <AccordionItem>
          {
            (contentIsVisible) => (
              <div>
                <Title>
                  <div style={{ display: flex, justifyContent: 'space-between', alignItems: 'center' }}>
                    <p>Why we exist</p>
                    <img
                        src={arrowUp}
                        style={{
                            transform: contentIsVisible ? 'rotate(0deg)' : 'rotate(90deg)'  // Points downwards when the item is hidden
                        }}
                    />
                  </div>
                </Title>
                <Content>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab numquam itaque veritatis cumque placeat laborum maiores optio quo at facilis! Eos, fuga maiores dolores labore qui corporis temporibus ad provident.
                  </p>
                </Content>
              </div>
            )
          }
        </AccordionItem>
      </Accordion>
    )
}
```

Since you will need to have multiple AccordionItem components under the parent Accordion component, it will be easier to arrange the dynamic parts of each accordion item in an array of objects instead of having many AccordionItem siblings:

```javascript
import { Accordion, AccordionItem, Title, Content } from "react-accordion-library";
import arrowUp from "./arrow-up-icon.png" // Assume it is an image stored in your project

function CustomeAccordion() {

    const accordionItems = [
        {
            title: 'Our mission',
            content: 'Our mission is to be Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis atque quam laboriosam est sint animi reprehenderit repudiandae debitis dolores natus!'
        },
        {
            title: 'Why we exist',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab numquam itaque veritatis cumque placeat laborum maiores optio quo at facilis! Eos, fuga maiores dolores labore qui corporis temporibus ad provident.'
        }
    ]

    return (
      <Accordion>
        {
          accordionItems.map((item, index) => {
              return (
                <AccordionItem key={index}>
                  {
                    (contentIsVisible) => (
                      <div>
                        <Title>
                          <div style={{ display: flex, justifyContent: 'space-between', alignItems: 'center' }}>
                              <p>{item.title}</p>
                              <img
                                  src={arrowUp}
                                  style={{
                                      transform: contentIsVisible ? 'rotate(0deg)' : 'rotate(180deg)'  // Points downwards when the item is hidden (or when contentIsVisible is false)
                                  }}
                              />
                          </div>
                        </Title>
                        <Content>
                          <p>{item.content}</p>
                        </Content>
                      </div>
                    )
                  }
                </AccordionItem>
              )
          })
        }
      </Accordion>
    )
}
```
