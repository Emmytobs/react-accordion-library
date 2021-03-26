import React, { useState, useContext, useRef, useEffect, createContext } from 'react';
import styles from './Accordion.module.css';

const AccordionContext = createContext();

export function Accordion(props) {
    const [ activeIndex, setActiveIndex ] = useState(null);
    const visibleContentByIndexForItems = {}
    props.children.forEach((child, index) => {
        visibleContentByIndexForItems[index] = false
    })
    const [visibleContentByIndex, setVisibleContentByIndex] = useState(visibleContentByIndexForItems)

    return (
        <div className={styles.accordionContainer} style={{ ...props }}>
            {
            props.children.map((child, index) => (
                <AccordionContext.Provider value={{ 
                    index, 
                    activeIndex, 
                    setActiveIndex,
                    visibleContentByIndex,
                    setVisibleContentByIndex,
                    visibleContentByIndexForItems
                }}>
                    {child}
                </AccordionContext.Provider>
            ))
            }
        </div>
    )
}

export function AccordionItem(props) {
    const { 
        index, 
        setActiveIndex, 
        visibleContentByIndex, 
        setVisibleContentByIndex, 
        visibleContentByIndexForItems 
    } = useContext(AccordionContext);

    const selectAsActiveIndex = (e) => {
        setActiveIndex(index);
        setVisibleContentByIndex({ ...visibleContentByIndexForItems, [index]: !visibleContentByIndex[index] })
    }

    return (
        <div className={styles.accordionItem} onClick={selectAsActiveIndex}>
            {props.children(visibleContentByIndex[index])}
        </div>
    )
}

export function Title(props) {
    return (
        <div className={styles.title} data-accordion-title>
            {props.children}
        </div>
    )
}
export function Content(props) {
    const { index, activeIndex, visibleContentByIndex } = useContext(AccordionContext);
    const contentRef = useRef();
    const [scrollHeight, setScrollHeight] = useState(null);

    // This is what makes the content to show or not
    const isIndex = index === activeIndex;
    const contentIsVisible = visibleContentByIndex[index];

    useEffect(() => {
        const { scrollHeight }= contentRef.current;
        setScrollHeight(scrollHeight);
    }, []);

    const style = {
        maxHeight: (isIndex && contentIsVisible) ? `${scrollHeight}px` : '0px'
    }

    return (
        <div ref={contentRef} className={styles.content} style={{ ...style }} >
            {props.children}
        </div>
    )
}