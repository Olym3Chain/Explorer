// JSX type declarations
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    
    interface Element extends React.ReactElement<any, any> {}
    
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
    
    interface ElementAttributesProperty {
      props: {};
    }
    
    interface ElementChildrenAttribute {
      children: {};
    }
  }
}