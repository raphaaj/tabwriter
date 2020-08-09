import { Parser, ParserResult, InstructionFactory, Tab } from '@tabwriter/core';

export interface TabWriterInstructions {
  instructions: string;
  rowsQuantity: number;
  rowsSpacing: number;
}

export interface InstructionWriteResult {
  success: boolean;
  instruction: string;
  readFromIdx: number;
  readToIdx: number;
  name: string;
  error: null | string;
}

export interface TabWriterResult {
  success: boolean;
  tab: string[][];
  instructionsResults: InstructionWriteResult[];
}

export class TabWriterService {
  public static async writeTab({
    instructions,
    rowsQuantity,
    rowsSpacing,
  }: TabWriterInstructions): Promise<TabWriterResult> {
    let successBuild = true;

    const parser = new Parser();
    return parser.parseAsync(instructions).then((parserResult) => {
      const tab = new Tab({ rowsQuantity, rowsSpacing });
      const instructionsResults: InstructionWriteResult[] = [];

      parserResult.forEach((parsedInstruction) => {
        const tabWriterInstructionResult = TabWriterService.writeParsedInstructionToTab(
          parsedInstruction,
          tab
        );
        instructionsResults.push(tabWriterInstructionResult);

        if (successBuild && !tabWriterInstructionResult.success)
          successBuild = false;
      });

      return {
        success: successBuild,
        tab: tab.blocks,
        instructionsResults,
      };
    });
  }

  public static writeParsedInstructionToTab(
    parsedInstruction: ParserResult,
    tab: Tab
  ): InstructionWriteResult {
    const instruction = InstructionFactory.getInstruction(parsedInstruction);
    const instructionWriteResult = instruction.writeOnTab(tab);

    return {
      success: instructionWriteResult.success,
      instruction: parsedInstruction.value,
      readFromIdx: parsedInstruction.readFromIdx,
      readToIdx: parsedInstruction.readToIdx,
      name: instruction.name,
      error: instructionWriteResult.description
        ? instructionWriteResult.description
        : null,
    };
  }
}
