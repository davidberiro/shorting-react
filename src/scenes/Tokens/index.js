import React, { PureComponent } from 'react'
import TokenTable from './TokenTable'
import TokenGiver from './TokenGiver'
import ContentCard from '../../components/cards/ContentCard'

class Tokens extends PureComponent {
  render() {
    return (
      <div>
      <ContentCard>
        <TokenTable />
      </ContentCard>
      <ContentCard>
        <TokenGiver />
      </ContentCard>
      </div>
    )
  }
}

export default Tokens