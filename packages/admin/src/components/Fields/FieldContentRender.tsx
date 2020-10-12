import React from 'react'
import { Space, Tag, Tooltip, Typography } from 'antd'
import { IConnectRender, IFileRender, ILazyImage } from '@/components/Fields'
import { IObjectRender } from './Object'
import { calculateFieldWidth } from './utils'

const { Text } = Typography

/**
 * 根据类型获取展示字段组件
 */
export function getFieldRender(field: SchemaFieldV2) {
  const { name, type, isMultiple } = field
  const width = calculateFieldWidth(field)

  switch (type) {
    case 'String':
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => (
        <Tooltip title={text}>
          <Text ellipsis style={{ width }}>
            {text}
          </Text>
        </Tooltip>
      )
    case 'Text':
    case 'MultiLineString':
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => (
        <Tooltip title={text}>
          <Text ellipsis style={{ width }}>
            {text}
          </Text>
        </Tooltip>
      )
    case 'Boolean':
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => {
        return <Text>{record[name] ? 'True' : 'False'}</Text>
      }
    case 'Number':
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => {
        const num = typeof record[name] === 'undefined' ? '-' : record[name]
        return <Text>{num} </Text>
      }
    case 'Url':
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => (
        <Typography.Link href={record[name]} target="_blank">
          {text}
        </Typography.Link>
      )
    case 'Email':
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => <Text>{text}</Text>
    case 'Tel':
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => <Text>{text}</Text>
    case 'Date':
      return undefined
    case 'DateTime':
      return undefined
    case 'Image':
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => {
        return <ILazyImage urls={record[name]} isMultiple={isMultiple} />
      }
    case 'File':
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => (
        <IFileRender urls={record[name]} isMultiple={isMultiple} />
      )
    case 'Array':
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => {
        if (!record[name]) {
          return text
        }

        return (
          <Space direction="vertical">
            {record[name]?.map((val: string, index: number) => (
              <Tag key={index}>{val}</Tag>
            ))}
          </Space>
        )
      }
    case 'Markdown':
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => (
        <Text ellipsis style={{ width }}>
          {text}
        </Text>
      )

    case 'RichText':
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => (
        <Text ellipsis style={{ width }}>
          {text}
        </Text>
      )

    case 'Connect':
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => (
        <IConnectRender value={record[name]} field={field} />
      )
    case 'Object':
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => <IObjectRender value={record[name]} />
    default:
      return (
        text: React.ReactNode,
        record: any,
        index: number,
        action: any
      ): React.ReactNode | React.ReactNode[] => text
  }
}