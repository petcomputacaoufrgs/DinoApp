import { AppBar, Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import { DinoTabPanelProps, TabPanelProps } from './props'

function getProps(index: number) {
	return {
	  id: `full-width-tab-${index}`,
	  'aria-controls': `full-width-tabpanel-${index}`,
	};
 }

 const DinoTabPanel = ({panels}: DinoTabPanelProps) => { 

  const [valueTab, setValueTab] = useState(0)

  const TabPanel = ({ children, value, index }: TabPanelProps) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        >
        {value === index && children}
      </div>
	  )
 }

  return (
    <div >
      <AppBar position="static" color="default">
        <Tabs
          value={valueTab}
          onChange={(event, newValue: number) => setValueTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs"
        >
          {panels.map((e, index) => <Tab key={index} label={e.name} {...getProps(index)} />)}
        </Tabs>
      </AppBar>
        {panels.map((e, index) => 
          <TabPanel key={index} value={valueTab} index={index} >
            {e.Component}
          </TabPanel>
        )}
    </div>
    )
  }

  export default DinoTabPanel