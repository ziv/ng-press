import {ChangeDetectionStrategy, Component, computed, input, Pipe} from '@angular/core';
import type {Token, Tokens} from 'marked';
import {marked} from 'marked';
import example from './example';

// Configure marked for GitHub-flavored markdown
marked.setOptions({
  gfm: true,
  breaks: true
});

@Pipe({
  name: 'depth',
  pure: true
})
export class HeadingDepthPipe {
  transform(token: Token): number {
    return (token as Tokens.Heading).depth
  }
}

// Component to render inline tokens (bold, italic, links, code, etc.)
@Component({
  selector: 'md-inline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (token of tokens(); track $index) {
      @switch (token.type) {
        @case ('text') {
          {{ getText(token) }}
        }
        @case ('strong') {
          <strong>
            <md-inline [tokens]="getTokens(token)"/>
          </strong>
        }
        @case ('em') {
          <em>
            <md-inline [tokens]="getTokens(token)"/>
          </em>
        }
        @case ('codespan') {
          <code class="inline-code">{{ getText(token) }}</code>
        }
        @case ('del') {
          <del>
            <md-inline [tokens]="getTokens(token)"/>
          </del>
        }
        @case ('link') {
          <a [href]="getHref(token)" [title]="getTitle(token)">
            <md-inline [tokens]="getTokens(token)"/>
          </a>
        }
        @case ('image') {
          <img [src]="getHref(token)" [alt]="getText(token)" [title]="getTitle(token)"/>
        }
        @case ('br') {
          <br/>
        }
        @case ('escape') {
          <span>{{ getText(token) }}</span>
        }
      }
    }
  `,
})
export class InlineRenderer {
  tokens = input.required<Token[]>();

  getText(token: Token): string {
    return (token as Tokens.Text | Tokens.Codespan | Tokens.Image | Tokens.Escape).text;
  }

  getTokens(token: Token): Token[] {
    return (token as Tokens.Strong | Tokens.Em | Tokens.Del | Tokens.Link).tokens || [];
  }

  getHref(token: Token): string {
    return (token as Tokens.Link | Tokens.Image).href;
  }

  getTitle(token: Token): string {
    return (token as Tokens.Link | Tokens.Image).title || '';
  }
}

// Component to render block-level tokens
@Component({
  selector: 'md-tokens',
  imports: [InlineRenderer, HeadingDepthPipe],
  template: `
    @for (token of tokens(); track $index) {
      @switch (token.type) {
        @case ('heading') {
          @switch (token | depth) {
            @case (1) {
              <h1>
                <md-inline [tokens]="getInlineTokens(token)"/>
              </h1>
            }
            @case (2) {
              <h2>
                <md-inline [tokens]="getInlineTokens(token)"/>
              </h2>
            }
            @case (3) {
              <h3>
                <md-inline [tokens]="getInlineTokens(token)"/>
              </h3>
            }
            @case (4) {
              <h4>
                <md-inline [tokens]="getInlineTokens(token)"/>
              </h4>
            }
            @case (5) {
              <h5>
                <md-inline [tokens]="getInlineTokens(token)"/>
              </h5>
            }
            @case (6) {
              <h6>
                <md-inline [tokens]="getInlineTokens(token)"/>
              </h6>
            }
          }
        }
        @case ('paragraph') {
          <p>
            <md-inline [tokens]="getInlineTokens(token)"/>
          </p>
        }
        @case ('list') {
          @if (isOrdered(token)) {
            <ol [attr.start]="getStart(token)">
              @for (item of getItems(token); track $index) {
                @if (item.task) {
                  <li class="task-list-item">
                    <input
                      disabled
                      type="checkbox"
                      [checked]="item.checked || false"
                      [attr.aria-label]="(item.checked ? 'Completed task' : 'Incomplete task')"
                    />
                    <md-inline [tokens]="item.tokens"/>
                  </li>
                } @else {
                  <li>
                    <md-inline [tokens]="item.tokens"/>
                  </li>
                }
              }
            </ol>
          } @else {
            <ul [class.task-list]="hasTaskItems(token)">
              @for (item of getItems(token); track $index) {
                @if (item.task) {
                  <li class="task-list-item">
                    <input
                      disabled
                      type="checkbox"
                      [checked]="item.checked || false"
                      [attr.aria-label]="(item.checked ? 'Completed task' : 'Incomplete task')"
                    />
                    <md-inline [tokens]="item.tokens"/>
                  </li>
                } @else {
                  <li>
                    <md-inline [tokens]="item.tokens"/>
                  </li>
                }
              }
            </ul>
          }
        }
        @case ('code') {
          <pre><code [class]="getCodeClass(token)">{{ getCodeText(token) }}</code></pre>
        }
        @case ('blockquote') {
          <blockquote>
            <md-tokens [tokens]="getBlockTokens(token)"/>
          </blockquote>
        }
        @case ('hr') {
          <hr/>
        }
        @case ('table') {
          <table>
            <thead>
            <tr>
              @for (header of getHeaders(token); track $index) {
                <th [style.text-align]="getAlign(token, $index)">
                  <md-inline [tokens]="header.tokens"/>
                </th>
              }
            </tr>
            </thead>
            <tbody>
              @for (row of getRows(token); track $index) {
                <tr>
                  @for (cell of row; track $index) {
                    <td [style.text-align]="getAlign(token, $index)">
                      <md-inline [tokens]="cell.tokens"/>
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        }
      }
    }
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokensRenderer {
  tokens = input.required<Token[]>();

  getInlineTokens(token: Token): Token[] {
    return (token as Tokens.Heading | Tokens.Paragraph).tokens;
  }

  isOrdered(token: Token): boolean {
    return (token as Tokens.List).ordered;
  }

  getStart(token: Token): number {
    return (token as Tokens.List).start || 1;
  }

  getItems(token: Token): Tokens.ListItem[] {
    return (token as Tokens.List).items;
  }

  hasTaskItems(token: Token): boolean {
    return (token as Tokens.List).items?.some(item => item.task) || false;
  }

  getCodeClass(token: Token): string {
    const lang = (token as Tokens.Code).lang;
    return lang ? `language-${lang}` : '';
  }

  getCodeText(token: Token): string {
    return (token as Tokens.Code).text;
  }

  getBlockTokens(token: Token): Token[] {
    return (token as Tokens.Blockquote).tokens;
  }

  getHeaders(token: Token): Tokens.TableCell[] {
    return (token as Tokens.Table).header;
  }

  getRows(token: Token): Tokens.TableCell[][] {
    return (token as Tokens.Table).rows;
  }

  getAlign(token: Token, index: number): string {
    const align = (token as Tokens.Table).align;
    return align?.[index] || 'left';
  }
}

// Main markdown component
@Component({
  selector: 'md-markdown',
  imports: [TokensRenderer],
  template: `
    <article class="markdown-content">
      <md-tokens [tokens]="tokens()"/>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Markdown {
  content = input<string>(example);

  tokens = computed(() => {
      const tokens = marked.lexer(this.content());

      // iterate through tokens recursively and add id to *all* tokens

      function burn(token: Token) {
        Object.defineProperty(token, 'id', {
          value: Math.random().toString(36),
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }

      function visitTokens(tokens: Token[]) {
        for (const token of tokens) {
          burn(token);
          if ('tokens' in token && Array.isArray(token.tokens)) {
            visitTokens(token.tokens);
          }
          if ('items' in token && Array.isArray(token.items)) {
            for (const item of token.items) {
              burn(item);
              if ('tokens' in item && Array.isArray(item.tokens)) {
                visitTokens(item.tokens);
              }
            }
          }
        }
      }

      const all = marked.lexer(this.content());
      // visitTokens(all);
      return all;
    }
  )
  ;
}
