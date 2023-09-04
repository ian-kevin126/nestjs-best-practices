/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-09-04 09:00:47
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-04 22:15:39
 * @FilePath: /nestjs-best-practices/server/src/test.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
describe('test jest hello world', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });

  it('should be true1', () => {
    expect(true).toBe(true);
  });

  it('should be true2', () => {
    expect(true).toBe(true);
  });

  describe('test jest hello world nest', () => {
    it('should be true', () => {
      expect(true).toBe(true);
    });

    it('should be true1', () => {
      expect(true).toBe(true);
    });

    it('should be true2', () => {
      expect(true).toBe(true);
    });
  });
});
