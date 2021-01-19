
export abstract class BaseService<T> {

  protected abstract init(location: number[]): T;

  protected getKey(x: any, y: any): string {
    return `${x}` + '-' + `${y}`;
  }
}