import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'
import {
  Card,
  CodeIcon,
  CircleArrowRightIcon,
  Heading,
  Menu,
  MenuOpenIcon,
  Pane,
  Paragraph,
  PersonIcon,
  Position,
  ShareIcon,
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
            selected: 0,
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
                    <Paragraph size={400}>
                      <a href="https://stender.io" target="_blank">
                        <PersonIcon marginRight={5} size={11} />
                        https://stender.io
                        <ShareIcon marginLeft={5} size={11} />
                      </a>
                    </Paragraph>
                    <Paragraph size={400}>Made with JavaScript & p5</Paragraph>
                    <Paragraph>
                      <a
                        target="_blank"
                        href="https://github.com/estender/stender-art/tree/master/art"
                      >
                        <CodeIcon marginRight={5} size={11} />
                        View source on Github
                        <ShareIcon marginLeft={5} size={11} />
                      </a>
                    </Paragraph>
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
                marginLeft={15}
                marginTop={10}
                position="absolute"
                zIndex={1}
                cursor="pointer"
                color={artCollection[state.selected].iconColor || '#999'}
                size={40}
              />
              <RepeatIcon
                onClick={() =>
                  setState({
                    selected: (state.selected + 1) % artCollection.length,
                  })
                }
                marginLeft={15}
                marginTop={62}
                position="absolute"
                zIndex={1}
                cursor="pointer"
                color={artCollection[state.selected].iconColor || '#999'}
                size={30}
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
