import React, { PureComponent } from 'react'
import TokenTable from './TokenTable'
import TokenGiver from './TokenGiver'
import TokenRate from './TokenRate'
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
      <ContentCard>
        <TokenRate />
      </ContentCard>
      </div>
    )
  }
}

export default Tokens