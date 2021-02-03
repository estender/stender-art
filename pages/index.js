import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'
import {
  Card,
  CircleArrowRightIcon,
  Heading,
  Menu,
  MenuOpenIcon,
  Pane,
  Paragraph,
  Position,
  SideSheet,
  RepeatIcon,
} from 'evergreen-ui';
import React from 'react'
import Component from '@reactions/component'
import { artCollection } from '../art'

const P5Wrapper = dynamic(() => import('react-p5-wrapper'), { ssr: false })

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Stender Art</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Component
          initialState={{
            isShown: false,
            selected: Math.floor(Math.random() * artCollection.length),
          }}
        >
          {({ state, setState }) => (
            <React.Fragment>
              <SideSheet
                isShown={state.isShown}
                onCloseComplete={() => setState({ isShown: false })}
                position={Position.LEFT}
                width={300}
              >
                <Pane
                  zIndex={2}
                  flexShrink={0}
                  elevation={0}
                  backgroundColor="white"
                >
                  <Pane padding={16}>
                    <Heading size={600}>Art by Eric Stender</Heading>
                    <Paragraph size={400}>Made with JavaScript & p5</Paragraph>
                  </Pane>
                </Pane>
                <Pane
                  flex="2"
                  overflowY="scroll"
                  background="tint1"
                  padding={16}
                >
                  <Menu>
                    <Menu.OptionsGroup
                      icon={CircleArrowRightIcon}
                      options={artCollection.map((val, idx) => {
                        return {
                          label: val.name,
                          value: idx,
                        };
                      })}
                      selected={state.selected}
                      color="#999"
                      onChange={(selected) => setState({ selected })}
                    />
                  </Menu>
                </Pane>
              </SideSheet>
              <MenuOpenIcon
                onClick={() => setState({ isShown: true })}
                marginLeft={10}
                marginTop={10}
                position="absolute"
                zIndex={1}
                cursor="pointer"
                color="#999"
                size={32}
              />
              <RepeatIcon
                onClick={() =>
                  setState({
                    selected: (state.selected + 1) % artCollection.length,
                  })
                }
                marginLeft={10}
                marginTop={50}
                position="absolute"
                zIndex={1}
                cursor="pointer"
                color="#999"
                size={24}
              />
              {P5Wrapper ? (
                <P5Wrapper sketch={artCollection[state.selected].script} />
              ) : (
                ''
              )}
            </React.Fragment>
          )}
        </Component>
      </main>
    </div>
  );
}
