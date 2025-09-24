import {
  IDataObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeApiError,
  IExecuteFunctions
} from 'n8n-workflow';

// Custom implementation by Fiori
export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Random Generator',
    name: 'random',
    icon: 'file:random.svg',
    group: ['transform'],
    version: 1,
    description: 'Fetch a random integer from Random.org (external service)',
    defaults: {
      name: 'Random',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          {
            name: 'True Random Number Generator',
            value: 'trueRandom',
            description: 'Retrieve a random integer from Random.org',
            action: 'Generate random integer',
          },
        ],
        default: 'trueRandom',
        noDataExpression: true,
        description: 'Choose the operation to perform',
      },
      {
        displayName: 'Min',
        name: 'min',
        type: 'number',
        typeOptions: {
          numberPrecision: 0,
        },
        default: 1,
        required: true,
        description: 'Lowest integer allowed',
      },
      {
        displayName: 'Max',
        name: 'max',
        type: 'number',
        typeOptions: {
          numberPrecision: 0,
        },
        default: 100,
        required: true,
        description: 'Highest integer allowed',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const itemCount = items.length === 0 ? 1 : items.length;

    for (let i = 0; i < itemCount; i++) {
      try {
        const operation = this.getNodeParameter('operation', i) as string;

        if (operation === 'trueRandom') {
          const min = this.getNodeParameter('min', i) as number;
          const max = this.getNodeParameter('max', i) as number;

          if (!Number.isInteger(min) || !Number.isInteger(max)) {
            throw new NodeApiError(this.getNode(), {
              message: 'Min and Max must be integers.',
            } as any);
          }
          if (min > max) {
            throw new NodeApiError(this.getNode(), {
              message: 'Min must be less than or equal to Max.',
            } as any);
          }

          const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

          const response = await this.helpers.httpRequest({
            url,
            method: 'GET',
            encoding: 'text',
            returnFullResponse: false,
          });

          const rawText = (response as unknown as string).toString().trim();
          const randomValue = parseInt(rawText, 10);

          if (Number.isNaN(randomValue)) {
            throw new NodeApiError(this.getNode(), {
              message: `Random.org returned unexpected response: ${rawText}`,
            } as any);
          }

          const json: IDataObject = {
            random: randomValue,
            min,
            max,
            provider: 'random.org',
            raw: rawText,
          };

          returnData.push({ json });
        } else {
          throw new NodeApiError(this.getNode(), {
            message: `Operation ${operation} not implemented.`,
          } as any);
        }
      } catch (error) {
        if (error instanceof NodeApiError) {
          throw error;
        }
        throw new NodeApiError(this.getNode(), error as any);
      }
    }

    return [returnData];
  }
}
