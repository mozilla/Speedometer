"use strict";(self.webpackChunkstreamingsite=self.webpackChunkstreamingsite||[]).push([[111],{2042(e,t,n){n.d(t,{P:()=>x,H:()=>f});var a=n(8535),r=n(3401),i=n(8574),l=n(2548),s=n(1178),o=n(3718),d=n(4021),c=n(7934),h=n(695);let u={Stream:{fields:{freeformTags:{merge:!1}}}};var m=n(9654);let p=new a.C((e,t)=>new r.c(n=>{let a=()=>{};(0,o.u4)(new Promise(e=>a=e));let r=t(e).subscribe({next:e=>n.next(e),error:e=>{n.error(e),a()},complete:()=>{n.complete(),a()}});return()=>{r.unsubscribe(),a()}})),g=null;function f(){return g}function x(){let e=new i.R({link:(0,l.H)([p,new d.z({uri:"https://gql.streamingsite.test/gql",fetch:c.c,batchMax:30,batchInterval:0})]),cache:new s.D({typePolicies:function(e){let t={...u};for(let[n,a]of Object.entries(e))t[n]={...t[n],fields:{...t[n]?.fields,...Object.fromEntries(a.map(e=>[e,{merge:!0}]))}};return t}((0,m.c)().gql.policies)}),assumeImmutableResults:!0});return e.writeQuery({query:h.wn,data:{currentUser:null}}),g=e,e}},1906(e,t,n){var a=n(4202);let r=(0,a.J1)`
  query TopNav_CurrentUser {
    currentUser {
      id
      login
      displayName
      profileImageURL(width: 50)
    }
    requestInfo {
      countryCode
    }
  }
`,i=(0,a.J1)`
  query SideNav($input: SideNavInput!, $creatorAnniversariesFeature: Boolean!, $withFreeformTags: Boolean!) {
    sideNav {
      sections {
        edges {
          cursor
          node {
            id
            title {
              fallbackLocalizedTitle
              key
            }
            content {
              edges {
                cursor
                node {
                  ... on Stream {
                    id
                    type
                    viewersCount
                    hasHypeTrain
                    broadcaster {
                      id
                      login
                      displayName
                      profileImageURL(width: 70)
                      broadcastSettings {
                        id
                        title
                      }
                    }
                    game {
                      id
                      slug
                      displayName
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`,l=(0,a.J1)`
  query ChannelShell($login: String!) {
    userOrError(login: $login) {
      ... on User {
        id
        login
        displayName
        primaryColorHex
        profileImageURL(width: 70)
        bannerImageURL
        stream {
          id
          viewersCount
        }
      }
    }
  }
`,s=(0,a.J1)`
  query StreamMetadata($channelLogin: String!) {
    user(login: $channelLogin) {
      id
      displayName
      primaryColorHex
      roles {
        isPartner
        isParticipatingDJ
      }
      profileImageURL(width: 70)
      lastBroadcast {
        id
        title
      }
      stream {
        id
        type
        createdAt
        game {
          id
          slug
          name
        }
      }
    }
  }
`,o=(0,a.J1)`
  query UseViewCount($channelLogin: String!) {
    user(login: $channelLogin) {
      id
      stream {
        id
        viewersCount
      }
    }
  }
`,d=(0,a.J1)`
  query UseLive($channelLogin: String!) {
    user(login: $channelLogin) {
      id
      login
      stream {
        id
        createdAt
      }
    }
  }
`,c=(0,a.J1)`
  query ChannelRoot_AboutPanel($channelLogin: String!, $skipSchedule: Boolean!) {
    user(login: $channelLogin) {
      id
      description
      displayName
      primaryColorHex
      profileImageURL(width: 70)
      followers {
        totalCount
      }
      roles {
        isPartner
        isAffiliate
      }
      channel {
        id
        socialMedias {
          id
          name
          title
          url
        }
      }
      lastBroadcast {
        id
        game {
          id
          displayName
        }
      }
    }
  }
`,h=(0,a.J1)`
  query ChannelPage_SubscribeButton_User($login: String!, $includeExpiredDunning: Boolean!) {
    user(login: $login) {
      id
      displayName
      subscriptionProducts {
        id
        name
        tier
        hasAdFree
      }
    }
  }
`,u=(0,a.J1)`
  query RealtimeStreamTagList($channelLogin: String!) {
    user(login: $channelLogin) {
      id
      stream {
        id
        freeformTags {
          id
          name
        }
      }
    }
  }
`,m=(0,a.J1)`
  query Shelves($imageWidth: Int, $itemsPerRow: Int, $platform: String!, $limit: Int, $requestID: String!, $context: String) {
    shelves(itemsPerRow: $itemsPerRow, platform: $platform, limit: $limit, requestID: $requestID, context: $context) {
      edges {
        node {
          id
          title {
            key
            fallbackLocalizedTitle
          }
          content {
            edges {
              cursor
              node {
                __typename
                ... on Stream {
                  id
                  viewersCount
                  previewImageURL
                  type
                  createdAt
                  broadcaster {
                    id
                    login
                    displayName
                    profileImageURL(width: 70)
                    broadcastSettings {
                      id
                      title
                    }
                    roles {
                      isPartner
                    }
                  }
                  game {
                    id
                    categorySlug
                    name
                    displayName
                  }
                  freeformTags {
                    id
                    name
                  }
                }
                ... on Game {
                  id
                  categorySlug
                  name
                  displayName
                  boxArtURL
                  viewersCount
                }
              }
            }
          }
        }
      }
    }
  }
`,p=new Set(["TopNav_CurrentUser","SideNav","ChannelShell","StreamMetadata","UseViewCount","UseLive","ChannelRoot_AboutPanel","ChannelPage_SubscribeButton_User","RealtimeStreamTagList","Shelves"]);n.d(t,{},{JM:l,Jz:d,Mx:h,Yo:p,lT:m,nW:u,q2:i,sL:o,tT:c,xh:s,y$:r})},7934(e,t,n){var a=n(3718);new URLSearchParams(location.search).has("debug")&&(globalThis.__gqlBatches=[]);let r=new Map;function i(e,t){r.set(e,t)}function l(e,t){let n=JSON.parse(String(t?.body??"[]")),i=Array.isArray(n)?n:[n],l=i.map(e=>{let t=r.get(e.operationName);return t?{data:t(e.variables??{}),extensions:{operationName:e.operationName}}:{errors:[{message:`no resolver for ${e.operationName}`}]}}),s=JSON.stringify(Array.isArray(n)?l:l[0]);return globalThis.__gqlBatches?.push({ops:i.map(e=>e.operationName),bytes:s.length}),(0,a.u4)(Promise.resolve(new Response(s,{status:200,headers:{"content-type":"application/json"}})))}n.d(t,{C:()=>i,c:()=>l})},695(e,t,n){var a=n(4202);let r=(0,a.J1)`
  query CommunityOnboardingAllowlist($channelID: ID!) {
    communityOnboarding {
      channelAllowLists(channelID: $channelID) {
        experimentName
      }
    }
  }
`,i=(0,a.J1)`
  query ChannelPermissionSet($channelID: ID!, $userID: ID!, $permissions: [String!]!) {
    channel(id: $channelID) {
      id
      permissionResults: hasPermissions(userID: $userID, permissions: $permissions) {
        permission
        hasPermission
      }
    }
  }
`,l=(0,a.J1)`
  query LowTrustUserProperties($channelID: ID!, $targetUserID: ID!) {
    lowTrustUserProperties(channelID: $channelID, userID: $targetUserID) {
      id
      treatment {
        type
      }
    }
  }
`,s=(0,a.J1)`
  query ChatHighlightSettings {
    currentUser {
      id
      chatHighlightSettings {
        id
        highlightType
        enabled
      }
    }
  }
`;n.d(t,{},{E9:r,VB:l,jB:i,wn:s})},1195(e,t,n){var a=n(404),r=n(7934);let i=a.BM,l=new Map(Object.entries(i).map(([e,t])=>[t.roomId,e])),s=Object.keys(i)[0];function o(e){e in i&&(s=e)}function d(e){return i[e]?.roomId??"1"}function c(e){let t=new Set;for(let n of Object.values(e.files))for(let e of Object.keys(n))t.add(e);for(let n of t)(0,r.C)(n,t=>{let a=function(e){for(let t of["login","channelLogin","channel","userLogin"]){let n=e[t];if("string"==typeof n&&n in i)return n}for(let t of["channelID","channelOwnerID"]){let n=e[t];if("string"==typeof n&&l.has(n))return l.get(n)}let t=e.channelIDs;return Array.isArray(t)&&"string"==typeof t[0]&&l.has(t[0])?l.get(t[0]):null}(t)??s;return e.files[a]?.[n]??e.files.global[n]??e.files[s]?.[n]??null})}n.d(t,{Ac:()=>c,Fh:()=>o,YM:()=>d})},4480(e,t,n){var a=n(2028);let r=()=>({login:null,displayName:null});function i(e){r=e}let l=/[^\uD800-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDFFF]/g,s=/\s/,o=/[.,!?;:]/,d=/^([a-z]+)(\d+)$/i,c=/^(?:https?:\/\/)?(?:clips\.twitch\.tv\/|(?:www\.|m\.)?twitch\.tv\/[\w-]+\/clip\/)([\w-]+)(?:[/?#]\S*)?$/i,h=/^(?:https?:\/\/)?(?:www\.|m\.)?twitch\.tv\/videos\/(\d+)(?:[/?#]\S*)?$/i,u=/^(https?:\/\/)?((?:[a-z0-9][a-z0-9-]*\.)+[a-z]{2,10})(?::\d{1,5})?(\/[\w./#%&@()+=:?~-]*[\w/#%&@()+=~-])?\/?$/i,m=/^([^\w@]*)@(\w{1,25})/,p={cheer:!0,doodlecheer:!0,biblethump:!0,cheerwhal:!0,corgo:!0,party:!0,scoops:!0,shamrock:!0,uni:!0};function g(e){return{type:a.X.Text,content:e}}function f(e,t){return t?[e,g(t)]:[e]}function x(e){let t=[];for(let n of e){let e=t[t.length-1];n.type===a.X.Text&&e&&e.type===a.X.Text?t[t.length-1]=g(e.content+n.content):t.push(n)}return t}function v(e){let t=e.body.match(l)??[],n=r(),i=function(e,t){let n=[],a=0;for(let r of function(e){let t=e.slice().sort((e,t)=>e.startIndex-t.startIndex),n=[];for(let e of t){let t=n[n.length-1];if(t&&e.startIndex<=t.endIndex+1)for(let n of(t.endIndex=Math.max(t.endIndex,e.endIndex),Object.keys(e.categories)))t.categories[n]=Math.max(t.categories[n]||0,e.categories[n]);else n.push({startIndex:e.startIndex,endIndex:e.endIndex,categories:{...e.categories}})}return n}(t)){if(r.startIndex>=e)break;r.startIndex>a&&n.push({start:a,end:r.startIndex-1,categories:null});let t=Math.min(r.endIndex,e-1);n.push({start:r.startIndex,end:t,categories:r.categories}),a=t+1}return a<e&&n.push({start:a,end:e-1,categories:null}),n}(t.length,e.flags),v=[];for(let r of i){let i=function(e,t,n,r,i){let l=e=>{if(e.word){for(let t of(e.gap&&e.parts.push(g(e.gap)),e.gap="",function(e,t,n,r,i){let l=e.length;if(Object.prototype.hasOwnProperty.call(n,t)){var s;let r;return[{type:a.X.Emote,content:{alt:e,emoteID:n[t].id,images:(s=n[t].id,r=`data/assets/emotes/${s}/`,{"1x":`${r}1.png`,"2x":`${r}2.png`,"4x":`${r}3.png`})}}]}let x=d.exec(e);if(x&&r>0&&!0===p[x[1].toLowerCase()])return[{type:a.X.Cheer,content:{alt:e,amount:parseInt(x[2],10),prefix:x[1]}}];if(l>3&&-1!==e.indexOf(".")){let t=l;for(;t>0&&o.test(e.charAt(t-1));)t--;let n=e.slice(0,t),r=e.slice(t),i=c.exec(n);if(i)return f({type:a.X.ClipLink,content:{slug:i[1],url:n}},r);let s=h.exec(n);if(s)return f({type:a.X.VideoLink,content:{videoID:s[1],url:n}},r);let d=u.exec(n);if(d){let e=d[1]?n:`https://${n}`;return f({type:a.X.Link,content:{displayText:n,url:e}},r)}}let v=-1!==e.indexOf("@")?m.exec(e):null;if(v){let t=[],n=v[2],r=n.toLowerCase(),l=1*(null!==i.login&&r===i.login.toLowerCase()||null!==i.displayName&&r===i.displayName.toLowerCase());v[1]&&t.push(g(v[1])),t.push({type:a.X.Mention,content:{recipient:n,currentUserMentionRelation:l}});let s=e.slice(v[0].length);return s&&t.push(g(s)),t}return[g(e)]}(e.word,e.wordStart,n,r,i)))e.parts.push(t);e.word=""}},v=e.reduce((n,a,r)=>{if(s.test(a))return l(n),n.gap+=a,n;n.word||(n.wordStart=t+r),n.word+=a;let i=e[r+1];if(void 0!==i&&o.test(i)&&"@"===n.word.charAt(0)){let t=e[r+2];(void 0===t||s.test(t))&&l(n)}return n},{parts:[],word:"",wordStart:t,gap:""});return l(v),v.gap&&v.parts.push(g(v.gap)),x(v.parts)}(t.slice(r.start,r.end+1),r.start,e.emotes,e.bits,n);if(r.categories)v.push({type:a.X.FlaggedSegment,content:{categories:r.categories,parts:i}});else for(let e of i)v.push(e)}return x(v)}n.d(t,{bT:()=>function e(t){return t.some(t=>t.type===a.X.Mention?1===t.content.currentUserMentionRelation:t.type===a.X.FlaggedSegment&&e(t.content.parts))},qw:()=>v,sK:()=>i})},2028(e,t,n){var a,r,i=((a={}).Message="message",a.Action="action",a.Subscription="subscription",a.Resubscription="resubscription",a.SubGift="subgift",a.SubMysteryGift="submysterygift",a.GiftPaidUpgrade="giftpaidupgrade",a.Raid="raid",a.Announcement="announcement",a.BitsBadgeTier="bitsbadgetier",a.Ritual="ritual",a.Notice="notice",a.Moderation="moderation",a.ChatCleared="chatcleared",a.RoomMods="roommods",a.SlowMode="slowmode",a.SubsOnlyMode="subsonlymode",a.FollowersOnlyMode="followersonlymode",a.EmoteOnlyMode="emoteonlymode",a.R9KMode="r9kmode",a.Connected="connected",a.Disconnected="disconnected",a.Reconnect="reconnect",a.LiveSeparator="liveseparator",a.Welcome="welcome",a),l=((r={})[r.Text=0]="Text",r[r.Mention=1]="Mention",r[r.Link=2]="Link",r[r.Emote=3]="Emote",r[r.Cheer=4]="Cheer",r[r.ClipLink=5]="ClipLink",r[r.VideoLink=6]="VideoLink",r[r.FlaggedSegment=7]="FlaggedSegment",r);n.d(t,{X:()=>l,Z:()=>i})},5557(e,t,n){var a=n(4848),r=n(5338),i=n(8797),l=n(3890),s=n(2042),o=n(9765),d=n(9654),c=n(625),h=n(3718),u=n(6540),m=n(4976),p=n(7767),g=n(8154),f=n(7538),x=n(1906),v=n(1195),b=n(2893),w=n(9152),y=n(643),j=n(9391);function $({stream:e}){let{login:t,displayName:n,profileImageURL:r,broadcastSettings:i}=e.broadcaster;return(0,a.jsxs)(j.PE,{as:"article",className:"stream-card","data-a-target":"stream-card",children:[(0,a.jsxs)(m.N_,{className:"stream-card__thumb tw-link-plain",to:`/${t}`,"data-a-target":"preview-card-image-link",children:[(0,a.jsx)(j.L_,{src:(0,w.EB)(e.previewImageURL,440,248),alt:i.title,loading:"lazy"}),(0,a.jsx)(j.PE,{className:"stream-card__tag stream-card__tag--live",as:"span",children:"LIVE"}),(0,a.jsx)(j.PE,{className:"stream-card__tag stream-card__tag--viewers",as:"span",children:(0,y.t)("viewers.count",{count:e.viewersCount})})]}),(0,a.jsxs)(j.PE,{className:"stream-card__meta",children:[(0,a.jsx)(j.eu,{src:r,size:40,alt:n}),(0,a.jsxs)(j.PE,{minWidth:"0",children:[(0,a.jsx)(j.Ni,{fontSize:4,bold:!0,lines:2,children:i.title}),(0,a.jsx)(m.N_,{to:`/${t}`,className:"tw-link-plain",children:(0,a.jsx)(j.Ni,{fontSize:3,color:"text-alt-2",ellipsis:!0,children:n})}),(0,a.jsx)(j.Ni,{fontSize:3,color:"text-alt-2",ellipsis:!0,children:e.game.name}),(0,a.jsx)(j.PE,{display:"flex",gap:.5,flexWrap:"wrap",margin:{top:.5},children:e.freeformTags.slice(0,2).map(e=>(0,a.jsx)(j.PE,{className:"channel-tag",as:"span",children:e.name},e.id))})]})]})]})}function S({game:e}){return(0,a.jsxs)(j.PE,{as:"article",className:"category-card","data-a-target":"category-card",children:[(0,a.jsx)(m.N_,{className:"category-card__art tw-link-plain",to:`/directory/category/${e.categorySlug??e.id}`,children:(0,a.jsx)(j.L_,{src:e.boxArtURL,alt:e.name,loading:"lazy"})}),(0,a.jsxs)(j.PE,{margin:{top:.5},children:[(0,a.jsx)(j.Ni,{fontSize:4,bold:!0,ellipsis:!0,children:e.name}),(0,a.jsx)(j.Ni,{fontSize:3,color:"text-alt-2",children:(0,y.t)("home.viewersOnCategory",{count:e.viewersCount})})]})]})}let N=(0,f.U)(x.lT,{options:()=>({variables:{imageWidth:50,itemsPerRow:6,platform:"web",limit:3,requestID:"JIRA-VXP-2397",context:"front_page"}})})(function({data:e}){let t=e.shelves?.edges??[];return(0,a.jsx)(a.Fragment,{children:t.map(({node:e})=>(0,a.jsxs)(j.PE,{as:"section",className:"shelf","data-a-target":"shelf",children:[(0,a.jsx)(j.PE,{className:"shelf__header",children:(0,a.jsx)(j.Ni,{as:"h2",fontSize:6,bold:!0,children:e.title.fallbackLocalizedTitle})}),(0,a.jsx)(j.PE,{className:"shelf__row",children:e.content.edges.map(({node:e},t)=>"Game"===e.__typename?(0,a.jsx)(S,{game:e},`${e.id}-${t}`):(0,a.jsx)($,{stream:e},`${e.id}-${t}`))})]},e.id))})});var P=n(4510),E=n(542),z=n(4319),C=n(5437);function I({stream:e}){let{login:t,displayName:n,profileImageURL:r}=e.broadcaster;return(0,a.jsx)(j.PE,{className:"side-nav-card","data-test-selector":"side-nav-card",children:(0,a.jsx)(j.PE,{className:"tw-tooltip-wrapper",children:(0,a.jsx)(j.m_,{label:n,children:(0,a.jsx)(m.N_,{className:"side-nav-card__link tw-link-plain",to:`/${t}`,"data-a-target":"side-nav-channel","data-login":t,children:(0,a.jsxs)(j.PE,{display:"flex",alignItems:"center",fullWidth:!0,children:[(0,a.jsx)(j.PE,{className:"side-nav-card__avatar",display:"flex",alignItems:"center",children:(0,a.jsx)(j.PE,{display:"flex",as:"figure",margin:0,children:(0,a.jsx)(j.PE,{className:"tw-avatar-ring",display:"flex",borderRadius:"full",children:(0,a.jsx)(j.PE,{display:"flex",borderRadius:"full",overflow:"hidden",children:(0,a.jsx)(j.eu,{src:r,size:30,alt:n})})})})}),(0,a.jsxs)(j.PE,{className:"side-nav-card__meta",display:"flex",flexDirection:"column",margin:{left:1},children:[(0,a.jsx)(j.PE,{className:"side-nav-card__title","data-a-target":"side-nav-title",children:(0,a.jsx)(j.PE,{display:"flex",alignItems:"center",children:(0,a.jsx)(j.VJ,{fontSize:4,bold:!0,color:"text-base",ellipsis:!0,children:n})})}),(0,a.jsx)(j.PE,{className:"side-nav-card__subtitle","data-a-target":"side-nav-game-title",children:(0,a.jsx)(j.PE,{display:"flex",alignItems:"center",children:(0,a.jsx)(j.VJ,{fontSize:4,color:"text-alt-2",ellipsis:!0,children:e.game.displayName})})})]}),(0,a.jsxs)(j.PE,{className:"side-nav-card__live-status",display:"flex",alignItems:"center","data-a-target":"side-nav-live-status",children:[(0,a.jsx)(j.PE,{className:"side-nav-card__live-dot-wrapper",display:"flex",alignItems:"center",children:(0,a.jsx)(j.PE,{className:"side-nav-card__live-dot"})}),(0,a.jsx)(j.PE,{margin:{left:.5},children:(0,a.jsx)(j.PE,{display:"flex",alignItems:"center",children:(0,a.jsx)(j.VJ,{fontSize:4,color:"text-base",children:(0,w.Ro)(e.viewersCount)})})})]})]})})})})})}function k({title:e,streams:t,collapsed:n,action:r}){return(0,a.jsxs)(j.PE,{className:"side-nav-section",as:"section","aria-label":e,children:[(0,a.jsx)(j.PE,{className:"side-nav-header",display:"flex",alignItems:"center",justifyContent:"space-between",padding:{x:1,y:1},children:(0,a.jsx)(j.Ni,{className:"side-nav-header__title",as:"h3",fontSize:4,bold:!0,transform:"uppercase",color:"text-alt-2",children:e})}),(0,a.jsx)(j.PE,{className:"side-nav-section__list",role:"group",children:t.map((e,t)=>(0,a.jsx)(I,{stream:e,collapsed:n},`${e.id}-${t}`))}),r]})}function M(){let e=(0,l.wA)(),t=(0,l.d4)(e=>e.ui.sideNavCollapsed),n=(0,l.d4)(e=>e.ui.recommendedExpanded),{data:r}=(0,E.I)(x.q2,{variables:{input:{recommendationContext:{platform:"web"}},creatorAnniversariesFeature:!1,withFreeformTags:!1}}),i=(0,u.useMemo)(()=>(r?.sideNav.sections.edges??[]).flatMap(e=>e.node.content.edges.map(e=>e.node)).filter(e=>e.broadcaster),[r]),s=n?i:i.slice(0,13);return(0,a.jsxs)(j.PE,{as:"nav",className:`side-nav ${t?"side-nav--collapsed":"side-nav--expanded"}`,"data-a-target":"side-nav","aria-label":"Primary Navigation",children:[(0,a.jsxs)(j.PE,{className:"side-nav-header",display:"flex",alignItems:"center",justifyContent:"space-between",padding:1,children:[(0,a.jsx)(j.Ni,{className:"side-nav-header__title",as:"h2",fontSize:5,bold:!0,children:(0,y.t)("nav.forYou")}),(0,a.jsx)(j.m_,{label:t?(0,y.t)("nav.expand"):(0,y.t)("nav.collapse"),children:(0,a.jsx)(j.a2,{label:t?(0,y.t)("nav.expand"):(0,y.t)("nav.collapse"),onClick:()=>e((0,z.n)()),"data-a-target":"side-nav-arrow",children:(0,a.jsx)(j.Ah,{path:t?C.Z.expand:C.Z.collapse})})})]}),(0,a.jsx)(j.PE,{className:"side-nav-sections",display:"flex",flexDirection:"column",children:(0,a.jsx)(k,{title:(0,y.t)("nav.recommended"),streams:s,collapsed:t,action:i.length>13||n?(0,a.jsx)(j.PE,{padding:{x:1,y:1},children:(0,a.jsx)(j.Sl,{children:(0,a.jsx)("button",{className:"side-nav__show-more","data-a-target":"side-nav-show-more-button",onClick:()=>e((0,z.Z)()),children:(0,a.jsx)(j.Ni,{fontSize:4,bold:!0,color:"text-link",children:n?(0,y.t)("nav.showLess"):(0,y.t)("nav.showMore")})})})}):null})})]})}function L(){let{login:e}=(0,p.g)();return(0,a.jsxs)(j.PE,{className:"signup-banner",as:"aside","data-a-target":"signup-banner",display:"flex",alignItems:"center",children:[(0,a.jsx)(j.eu,{src:"data/assets/avatars/lumenfall/70.png",size:48,alt:""}),(0,a.jsx)(j.PE,{flexGrow:1,margin:{left:1},children:(0,a.jsx)(j.PE,{display:"flex",alignItems:"center",children:(0,a.jsx)(j.VJ,{fontSize:5,bold:!0,color:"text-base",children:(0,y.t)("signup.banner",{name:e??"StreamingSite"})})})}),(0,a.jsx)(j.Sl,{margin:{x:1},children:(0,a.jsx)(j.SS,{appearance:"overlay",size:"large",children:(0,a.jsx)(j.PE,{padding:{x:1},children:(0,a.jsx)(j.VJ,{fontSize:5,bold:!0,children:(0,y.t)("nav.signup")})})})}),(0,a.jsx)(j.K0,{path:C.Z.close,label:"Dismiss",appearance:"overlay"})]})}function _({icon:e,label:t,appearance:n}){return(0,a.jsx)(j.m_,{label:t,children:(0,a.jsx)(j.a2,{label:t,appearance:n??"text",children:(0,a.jsx)(j.Ah,{path:C.Z[e]})})})}let T=["Categories","Channels","Tags"],A=["Channel","Creator Dashboard","Drops & Rewards","Subscriptions","Settings","Log Out"];function D(){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(j.PE,{className:"top-nav__search-suggestions",role:"listbox",hidden:!0,"data-a-target":"search-suggestions",display:"none",children:T.map(e=>(0,a.jsx)(j.PE,{role:"option",padding:{x:1,y:.5},children:(0,a.jsxs)(j.PE,{display:"flex",alignItems:"center",gap:1,children:[(0,a.jsx)(j.Ah,{path:C.Z.search,size:16}),(0,a.jsx)(j.VJ,{fontSize:4,children:e})]})},e))}),(0,a.jsx)(j.PE,{className:"top-nav__user-menu",role:"menu",hidden:!0,"data-a-target":"user-menu",display:"none",children:A.map(e=>(0,a.jsx)(j.PE,{role:"menuitem",padding:{x:1,y:.5},children:(0,a.jsxs)(j.PE,{as:"a",display:"flex",alignItems:"center",gap:1,children:[(0,a.jsx)(j.PE,{display:"flex",children:(0,a.jsx)(j.Ah,{path:C.Z.person,size:16})}),(0,a.jsx)(j.VJ,{fontSize:4,children:e})]})},e))})]})}function R({to:e,children:t}){return(0,a.jsx)(j.Sl,{padding:{x:1},children:(0,a.jsx)(m.N_,{to:e,className:"top-nav__link tw-link-plain","data-a-target":"top-nav-link",children:(0,a.jsx)(j.PE,{display:"flex",alignItems:"center",height:"3rem",children:(0,a.jsx)(j.Ni,{fontSize:5,bold:!0,children:t})})})})}function V(){let[e,t]=(0,u.useState)("");return(0,a.jsx)(j.PE,{className:"top-nav__search-container",display:"flex",justifyContent:"center",padding:{x:1},children:(0,a.jsxs)(j.PE,{className:"top-nav__search-box",role:"search",as:"form",onSubmit:e=>e.preventDefault(),children:[(0,a.jsx)("input",{className:"top-nav__search-input",type:"search",autoComplete:"off",placeholder:(0,y.t)("nav.search"),"aria-label":(0,y.t)("nav.search"),"data-a-target":"tw-input",value:e,onChange:e=>t(e.target.value)}),(0,a.jsx)(j.m_,{label:(0,y.t)("nav.search"),children:(0,a.jsx)("button",{className:"top-nav__search-button",type:"submit","aria-label":(0,y.t)("nav.search"),children:(0,a.jsx)(j.PE,{display:"flex",alignItems:"center",justifyContent:"center",children:(0,a.jsx)(j.Ah,{path:C.Z.search})})})})]})})}function H(){let{data:e}=(0,E.I)(x.y$),t=!!e?.currentUser;return(0,a.jsxs)(j.PE,{as:"nav",className:"top-nav","data-a-target":"top-nav-container",children:[(0,a.jsxs)(j.PE,{className:"top-nav__menu",display:"flex",alignItems:"center",children:[(0,a.jsx)(m.N_,{to:"/",className:"top-nav__logo","aria-label":"StreamingSite home",children:(0,a.jsx)(j.PE,{display:"flex",alignItems:"center",padding:{x:.5},children:(0,a.jsx)(j.Ah,{path:C.Z.logo,size:30})})}),(0,a.jsxs)(j.PE,{display:"flex",alignItems:"center",margin:{left:1},children:[(0,a.jsx)(R,{to:"/",children:(0,y.t)("nav.browse")}),(0,a.jsx)(_,{icon:"menu",label:"More"})]})]}),(0,a.jsx)(V,{}),(0,a.jsxs)(j.PE,{className:"top-nav__menu top-nav__menu--right",display:"flex",alignItems:"center",justifyContent:"flex-end",children:[(0,a.jsx)(j.K0,{path:C.Z.gift,label:"Prime Gaming"}),(0,a.jsx)(j.K0,{path:C.Z.inbox,label:"Notifications"}),t?null:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(j.Sl,{margin:{x:.5},children:(0,a.jsx)(j.SS,{appearance:"secondary","data-a-target":"login-button",children:(0,a.jsx)(j.PE,{padding:{x:.5},children:(0,y.t)("nav.login")})})}),(0,a.jsx)(j.Sl,{margin:{x:.5},children:(0,a.jsx)(j.SS,{appearance:"primary","data-a-target":"signup-button",children:(0,a.jsx)(j.PE,{padding:{x:.5},children:(0,y.t)("nav.signup")})})})]}),(0,a.jsx)(_,{icon:"user",label:"User menu"})]}),(0,a.jsx)(D,{})]})}let q=["Welcome to StreamingSite","Turn on notifications","Your first drop is ready","A channel you may like is live","New features this week","Tips for chat"];function O(){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(j.PE,{className:"toast-container",role:"status","aria-live":"polite",position:"fixed",zIndex:3e3}),(0,a.jsxs)(j.PE,{className:"onsite-notifications",role:"dialog",hidden:!0,display:"none","data-a-target":"onsite-notifications",children:[(0,a.jsxs)(j.PE,{display:"flex",justifyContent:"space-between",alignItems:"center",padding:1,children:[(0,a.jsx)(j.VJ,{fontSize:5,bold:!0,children:"Notifications"}),(0,a.jsx)(j.K0,{path:C.Z.close,label:"Close"})]}),q.map((e,t)=>(0,a.jsxs)(j.PE,{display:"flex",alignItems:"center",gap:1,padding:1,children:[(0,a.jsx)(j.eu,{src:"data/assets/avatars/lumenfall/50.png",size:30,alt:""}),(0,a.jsxs)(j.PE,{children:[(0,a.jsx)(j.VJ,{fontSize:4,children:e}),(0,a.jsx)(j.VJ,{fontSize:3,color:"text-alt-2",children:`${t+1}h ago`})]}),(0,a.jsx)(j.PE,{display:"flex",style:{marginLeft:"auto"},children:(0,a.jsx)(j.Ah,{path:C.Z.chevronDown,size:16})})]},e))]}),(0,a.jsx)(j.PE,{className:"modal-root",role:"presentation","data-a-target":"modal-root"}),(0,a.jsx)(j.PE,{className:"popover-root",role:"presentation","data-a-target":"popover-root"}),(0,a.jsx)(j.PE,{className:"shortcuts-dialog",role:"dialog",hidden:!0,display:"none","data-a-target":"shortcuts-dialog",children:[["f","Fullscreen"],["m","Mute"],["t","Theatre mode"],["alt+x","Toggle chat"],["c","Clip"],["space","Play or pause"]].map(([e,t])=>(0,a.jsxs)(j.PE,{display:"flex",justifyContent:"space-between",padding:.5,children:[(0,a.jsx)(j.VJ,{fontSize:4,children:t}),(0,a.jsx)(j.PE,{padding:{x:.5},background:"alt-2",borderRadius:"rounded",children:(0,a.jsx)(j.VJ,{fontSize:3,bold:!0,children:e})})]},e))})]})}let F=(0,P.DU)`
  html, body, #root { height: 100%; }
  *, *::before, *::after { box-sizing: border-box; }
  :root { --signup-banner-height: 8rem; }
  .tw-link-plain:hover { text-decoration: none; }
`,U=[()=>n.e(875).then(n.bind(n,1946)),()=>n.e(890).then(n.bind(n,697)),()=>n.e(20).then(n.bind(n,1897)),()=>n.e(691).then(n.bind(n,5280)),()=>n.e(435).then(n.bind(n,8524)),()=>n.e(608).then(n.bind(n,8285)),()=>n.e(372).then(n.bind(n,2763)),()=>n.e(346).then(n.bind(n,2853)),()=>n.e(374).then(n.bind(n,9665)),()=>n.e(446).then(n.bind(n,4939)),()=>n.e(734).then(n.bind(n,2463)),()=>n.e(342).then(n.bind(n,3789)),()=>n.e(344).then(n.bind(n,7151)),()=>n.e(331).then(n.bind(n,3578)),()=>n.e(370).then(n.bind(n,7981)),()=>n.e(624).then(n.bind(n,4943)),()=>n.e(311).then(n.bind(n,1850)),()=>n.e(107).then(n.bind(n,9922)),()=>n.e(723).then(n.bind(n,6938)),()=>n.e(525).then(n.bind(n,9304)),()=>n.e(476).then(n.bind(n,1575)),()=>n.e(110).then(n.bind(n,6595)),()=>n.e(38).then(n.bind(n,879)),()=>n.e(508).then(n.bind(n,3259)),()=>n.e(439).then(n.bind(n,6436)),()=>n.e(308).then(n.bind(n,9309)),()=>n.e(330).then(n.bind(n,5829)),()=>n.e(463).then(n.bind(n,468)),()=>n.e(174).then(n.bind(n,7783)),()=>n.e(0).then(n.bind(n,5415)),()=>n.e(773).then(n.bind(n,186)),()=>n.e(352).then(n.bind(n,1108))],J=()=>n.e(817).then(n.bind(n,9553)),B=(0,u.lazy)(J);(0,h.u4)(J()),(0,h.u4)(Promise.all(U.map(e=>e())));let W=[{element:(0,a.jsx)(function(){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(F,{}),(0,a.jsxs)(g.m,{children:[(0,a.jsx)("html",{lang:"en",className:"tw-root--theme-dark"}),(0,a.jsx)("meta",{name:"theme-color",content:"#0e0e10"})]}),(0,a.jsxs)(j.PE,{className:"tw-root",position:"relative",fullHeight:!0,children:[(0,a.jsx)(H,{}),(0,a.jsxs)(j.PE,{className:"root-scrollable","data-a-target":"root-scrollable",children:[(0,a.jsx)(M,{}),(0,a.jsx)(j.PE,{as:"main",className:"root-scrollable__main","data-a-target":"main-page-scrollable-area",children:(0,a.jsx)(p.sv,{})})]}),(0,a.jsx)(L,{}),(0,a.jsx)(O,{})]})]})},{}),children:[{path:"/",element:(0,a.jsx)(function(){return(0,v.Fh)("lumenfall"),(0,a.jsxs)(j.PE,{className:"home-page","data-a-target":"home-page",children:[(0,a.jsx)(g.m,{children:(0,a.jsx)("title",{children:(0,y.t)("home.title")})}),(0,a.jsxs)(m.N_,{className:"home-hero tw-link-plain",to:"/lumenfall","data-a-target":"home-channel-link",children:[(0,a.jsx)(j.L_,{className:"home-hero__image",src:"data/assets/thumbs/lumenfall-1280x360.png",alt:"Lumenfall"}),(0,a.jsxs)(j.PE,{className:"home-hero__meta",children:[(0,a.jsx)(j.Ni,{fontSize:6,bold:!0,children:"Lumenfall"}),(0,a.jsx)(j.Ni,{fontSize:4,color:"text-alt",children:(0,y.t)("viewers.live",{count:24318})})]})]}),(0,a.jsx)(N,{}),(0,a.jsx)(b.J,{login:"lumenfall",context:"home"})]})},{})},{path:"/:login",element:(0,a.jsx)(u.Suspense,{fallback:null,children:(0,a.jsx)(B,{})})}]}],G="/"===location.pathname?(0,m.Ys)(W):(0,p.bg)(W,{initialEntries:["/"]});function X(){return(0,a.jsx)(m.pg,{router:G})}var Z=n(4480);!async function(){let e=await (0,d.o)();(0,c.b)(e);let t=(0,o.pq)();(0,Z.sK)(()=>t.getState().session);let n=(0,s.P)(),u=(0,r.H)(document.getElementById("root"));(0,h.th)(u),u.render((0,a.jsx)(l.Kq,{store:t,children:(0,a.jsx)(i.X,{client:n,children:(0,a.jsx)(X,{})})})),await window.ssrWorkload.whenIdle(),window.ssrReady=!0,window.dispatchEvent(new Event("ssr-ready"))}()},9654(e,t,n){var a=n(404),r=n(1195);let i=null;async function l(e){let t=await fetch(new URL(`data/${e}`,document.baseURI));if(!t.ok)throw Error(`${e}: ${t.status}`);return t.json()}async function s(){let e=a.Ci,t=e.filter(e=>e.rate>0),n=Object.keys(a.BM),[s,o,d,c,h,u,m,...p]=await Promise.all([l("irc/rooms.json"),l("catalog/badges.json"),l("catalog/emotes.json"),l("gql/global.json"),l("gql/documents.json"),l("gql/waves.json"),l("gql/policies.json"),...t.map(e=>l(`irc/${e.name}.json`))]),g=p.slice(0,t.length),f=await Promise.all(n.map(e=>l(`gql/${e}.json`))),x={global:c};return n.forEach((e,t)=>x[e]=f[t]),i={steps:e,rooms:s,badges:o,emotes:d,frames:Object.fromEntries(t.map((e,t)=>[e.name,g[t]])),gql:{files:x,documents:h,waves:u,policies:m}},(0,r.Ac)(i.gql),i}function o(){if(!i)throw Error("workload data not loaded");return i}n.d(t,{c:()=>o,o:()=>s})},1358(e,t,n){var a=n(9524);let r=new Set,i=new Map;function l(e){i.set(e.login,e)}function s(e,t){for(let n of r)n.joined.has(e)&&n.schedule(t)}class o extends EventTarget{later(e,t){let n=(0,a.setTimeout)(()=>{this.pending.delete(n),3!==this.readyState&&t()},e);this.pending.add(n)}fire(e,t){t?.call(this,e),this.dispatchEvent(e)}deliver(e){1===this.readyState&&this.fire(new MessageEvent("message",{data:e}),this.onmessage)}reply(e){this.later(0,()=>this.deliver(e))}schedule(e){for(let t of e)this.later(t.at,()=>this.deliver(t.data))}send(e){if(1!==this.readyState)throw new DOMException("WebSocket is not open","InvalidStateError");for(let t of e.split("\r\n"))t&&this.handleClientLine(t)}handleClientLine(e){let t=e.indexOf(" "),n=-1===t?e:e.slice(0,t),a=-1===t?"":e.slice(t+1);switch(n){case"CAP":this.reply(`:tmi.twitch.tv CAP * ACK :${a.replace(/^REQ :/,"")}\r
`);break;case"NICK":{let e=this.nick=a.trim();this.reply(`:tmi.twitch.tv 001 ${e} :Welcome, GLHF!\r
:tmi.twitch.tv 002 ${e} :Your host is tmi.twitch.tv\r
:tmi.twitch.tv 003 ${e} :This server is rather new\r
:tmi.twitch.tv 004 ${e} :-\r
:tmi.twitch.tv 375 ${e} :-\r
:tmi.twitch.tv 372 ${e} :You are in a maze of twisty passages, all alike.\r
:tmi.twitch.tv 376 ${e} :>\r
`);break}case"JOIN":for(let e of a.split(","))this.join(e.trim().replace(/^#/,""));break;case"PART":{let e=a.trim().replace(/^#/,"");this.joined.delete(e);let t=this.nick;this.reply(`:${t}!${t}@${t}.tmi.twitch.tv PART #${e}\r
`);break}case"PING":this.reply(`:tmi.twitch.tv PONG tmi.twitch.tv ${a}\r
`)}}join(e){let t=this.nick,n=i.get(e);this.joined.add(e);let a=n?`${n.roomState} :tmi.twitch.tv ROOMSTATE #${e}\r
`:"";this.reply(`:${t}!${t}@${t}.tmi.twitch.tv JOIN #${e}\r
${a}`),this.reply(`:${t}.tmi.twitch.tv 353 ${t} = #${e} :${t}\r
:${t}.tmi.twitch.tv 366 ${t} #${e} :End of /NAMES list\r
`)}close(e=1e3,t=""){if(3!==this.readyState){for(let e of this.pending)(0,a.clearTimeout)(e);this.pending.clear(),this.readyState=3,r.delete(this),this.fire(new CloseEvent("close",{code:e,reason:t,wasClean:!0}),this.onclose)}}constructor(e){super(),this.CONNECTING=0,this.OPEN=1,this.CLOSING=2,this.CLOSED=3,this.protocol="",this.extensions="",this.binaryType="blob",this.bufferedAmount=0,this.readyState=0,this.onopen=null,this.onmessage=null,this.onerror=null,this.onclose=null,this.nick="",this.joined=new Set,this.pending=new Set,this.url=String(e),r.add(this),this.later(0,()=>{this.readyState=1,this.fire(new Event("open"),this.onopen)})}}function d(e,t){return t?new o(e):new WebSocket(e)}o.CONNECTING=0,o.OPEN=1,o.CLOSING=2,o.CLOSED=3,n.d(t,{Ht:()=>s,KD:()=>d,P3:()=>l})},9524(e,t,n){n.r(t);let a=!1,r=17926128e5,i=1,l=0,s=new Map,o=[],d=!1;function c(){a=!0}function h(){return a}function u(){return a?r:Date.now()}function m(e,t,n){let a=Math.max(0,t||0),o={id:i++,due:r+a,seq:l++,interval:n?Math.max(1,a):null,callback:e};return s.set(o.id,o),d||E(r),o.id}function p(e){void 0!==e&&s.delete(e)}let g=globalThis.setTimeout.bind(globalThis),f=globalThis.clearTimeout.bind(globalThis),x=globalThis.setInterval.bind(globalThis),v=globalThis.clearInterval.bind(globalThis);function b(e,t=0){return a?m(e,t,!1):g(e,t)}function w(e){a?p(e):f(e)}function y(e,t){return a?m(e,t,!0):x(e,t)}function j(e){a?p(e):v(e)}let $="function"==typeof MessageChannel?new MessageChannel:null,S=[];function N(){return new Promise(e=>{S.push(e),$.port2.postMessage(null)})}function P(e){let t=null;for(let n of s.values())!(n.due>e)&&(!t||n.due<t.due||n.due===t.due&&n.seq<t.seq)&&(t=n);return t}async function E(e){if(!d){d=!0;try{for(;;){await N();let t=P(e);if(!t)break;r=Math.max(r,t.due),null===t.interval?s.delete(t.id):(t.due+=t.interval,t.seq=l++);try{t.callback()}catch(e){reportError(e)}}}finally{d=!1}P(r)?E(r):o.splice(0).forEach(e=>e())}}async function z(e){for(;d;)await C();let t=r+e;await E(t),r=t,await C()}function C(){return d||P(r)?new Promise(e=>o.push(e)):Promise.resolve()}function I(){return d||null!==P(r)}$&&($.port1.onmessage=()=>S.shift()?.()),n.d(t,{advance:()=>z,clearInterval:()=>j,clearTimeout:()=>w,enableVirtualTime:()=>c,hasDueTimers:()=>I,isVirtualTime:()=>h,nextTask:()=>N,now:()=>u,setInterval:()=>y,setTimeout:()=>b,whenTimersIdle:()=>C})},2893(e,t,n){var a=n(4848),r=n(6540),i=n(4202),l=n(542),s=n(1906),o=n(1195),d=n(9654);let c=new Map;function h(e){let t=c.get(e);if(!t){let n=(0,d.c)().gql.documents[e];if(!n)return null;t=(0,i.J1)(n.query),c.set(e,t)}return t}let u=(0,r.memo)(function({name:e,login:t,onDone:n}){let a=h(e),i=(0,r.useMemo)(()=>(function(e,t){let n={};for(let a of(0,d.c)().gql.documents[e]?.variables??[])"channelID"===a||"channelOwnerID"===a?n[a]=(0,o.YM)(t):"channelIDs"===a?n[a]=[(0,o.YM)(t)]:n[a]=t;return n})(e,t),[e,t]),{loading:s}=(0,l.I)(a,{variables:i});return(0,r.useEffect)(()=>{s||n(e)},[s,e,n]),null}),m=[0,2,4,6];function p({login:e,context:t}){let n=(0,r.useMemo)(()=>{var e;return e=(0,d.c)().gql.waves[t],m.map((t,n)=>{let a=m[n+1]??e.length,r=new Set;for(let n of e.slice(t,a))for(let e of n)!s.Yo.has(e)&&h(e)&&r.add(e);return[...r]}).filter(e=>e.length>0)},[t]),[i,l]=(0,r.useState)(0),o=(0,r.useRef)(new Set),c=(0,r.useCallback)(e=>{o.current.add(e),n[i]?.every(e=>o.current.has(e))&&l(e=>e+1)},[i,n]);return(0,a.jsx)(a.Fragment,{children:n.slice(0,i+1).flatMap(t=>t.map(t=>(0,a.jsx)(u,{name:t,login:e,onDone:c},t)))})}n.d(t,{J:()=>p})},9152(e,t,n){var a=n(7876),r=n(9524);let i=e=>String(e).padStart(2,"0");function l(e){return e>=1e6?`${(e/1e6).toFixed(e>=1e7?0:1).replace(/\.0$/,"")}M`:e>=1e4?`${(e/1e3).toFixed(1).replace(/\.0$/,"")}K`:e.toLocaleString("en-US")}function s(e){let t=Math.max(0,(0,a.O)((0,r.now)(),new Date(e)));return`${Math.floor(t/3600)}:${i(Math.floor(t%3600/60))}:${i(t%60)}`}function o(e,t,n){return e.replace("{width}x{height}",`${t}x${n}`)}n.d(t,{EB:()=>o,Ro:()=>l,xU:()=>s})},643(e,t,n){var a=n(6031),r=n.n(a);let i={"viewers.count":"{count, number} {count, plural, one {viewer} other {viewers}}","viewers.live":"{count, number} watching now","followers.count":"{count, number} {count, plural, one {follower} other {followers}}","about.title":"About {name}","nav.forYou":"For You","nav.recommended":"Recommended Channels","nav.showMore":"Show More","nav.showLess":"Show Less","nav.collapse":"Collapse Side Nav","nav.expand":"Expand Side Nav","nav.browse":"Browse","nav.login":"Log In","nav.signup":"Sign Up","nav.search":"Search","channel.follow":"Follow","channel.subscribe":"Subscribe","channel.gift":"Gift a Sub","channel.live":"LIVE","channel.offline":"OFFLINE","channel.title":"{name} - StreamingSite","player.loading":"Loading","player.play":"Play","player.pause":"Pause","player.mute":"Mute","player.volume":"Volume","player.settings":"Settings","player.theatre":"Theatre Mode","player.fullscreen":"Fullscreen","player.clip":"Clip","home.title":"StreamingSite - Live streams","home.shelf.live":"Live channels we think you'll like","home.shelf.categories":"Categories we think you'll like","home.viewersOnCategory":"{count, number} {count, plural, one {viewer} other {viewers}}","signup.banner":"Sign up to experience the best of {name}. Chat, follow or subscribe."},l=new Map;function s(e,t){let n=l.get(e);return n||(n=new(r())(i[e],"en-US"),l.set(e,n)),n.format(t)}n.d(t,{t:()=>s})},5437(e,t,n){n.d(t,{},{Z:{logo:"M3 2h14v10l-4 4h-3l-3 3V16H3V2zm2 2v10h3v2l2-2h3l3-3V4H5zm4 2h2v5H9V6zm4 0h2v5h-2V6z",menu:"M10 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z",search:"M13.2 12.2l4.4 4.4-1 1-4.4-4.4a6 6 0 111-1zM8.5 3.5a5 5 0 100 10 5 5 0 000-10z",user:"M10 2a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4zM3 16c0-3 3-5 7-5s7 2 7 5v2H3v-2z",inbox:"M2 4h16v10h-4l-1 2H7l-1-2H2V4zm2 2v6h3l1 2h4l1-2h3V6H4z",collapse:"M8 4l1.4 1.4L5.8 9H17v2H5.8l3.6 3.6L8 16l-6-6 6-6zM18 4v12h-2V4h2z",expand:"M12 4l-1.4 1.4L14.2 9H3v2h11.2l-3.6 3.6L12 16l6-6-6-6zM2 4v12h2V4H2z",heart:"M10 17l-1.2-1C4.600 12.200 2 9.900 2 7a4 4 0 014-4c1.600 0 3 .8 4 2 1-1.200 2.400-2 4-2a4 4 0 014 4c0 2.900-2.600 5.200-6.800 9L10 17z",star:"M10 2l2.400 5 5.600.8-4 3.900 1 5.600-5-2.700-5 2.700 1-5.600-4-3.900L7.600 7 10 2z",gift:"M3 7h14v3h-1v7H4v-7H3V7zm2 3v5h4v-5H5zm6 0v5h4v-5h-4zM9 3c1 0 1.500.5 2 1.500C11.500 3.500 12 3 13 3a2 2 0 010 4h-6a2 2 0 010-4h2z",chevronDown:"M14.800 7.200L16 8.400l-6 6-6-6 1.200-1.200L10 12l4.800-4.800z",play:"M5 17V3l12 7-12 7z",pause:"M5 3h3v14H5V3zm7 0h3v14h-3V3z",volume:"M3 7h3l5-4v14l-5-4H3V7zm10.500-1.500A6 6 0 0116 10a6 6 0 01-2.500 4.500l-1-1.500A4 4 0 0014 10a4 4 0 00-1.500-3l1-1.500z",mute:"M3 7h3l5-4v14l-5-4H3V7zm10 .5L14.500 6 16 7.500 17.500 6 19 7.500 17.500 9 19 10.500 17.500 12 16 10.500 14.500 12 13 10.500 14.500 9 13 7.500z",settings:"M10 7a3 3 0 110 6 3 3 0 010-6zm-1-5h2l.5 2.300 1.600.9 2.200-.8 1 1.700-1.700 1.600v1.800l1.700 1.600-1 1.700-2.200-.8-1.600.9L11 18H9l-.5-2.300-1.600-.9-2.200.8-1-1.700L5.400 12.300V10.500L3.700 8.900l1-1.700 2.200.8 1.600-.9L9 2z",theatre:"M2 4h16v12H2V4zm2 2v8h7V6H4zm9 0v8h3V6h-3z",fullscreen:"M3 3h5v2H5v3H3V3zm9 0h5v5h-2V5h-3V3zM3 12h2v3h3v2H3v-5zm12 0h2v5h-5v-2h3v-3z",clip:"M3 4h14v12H3V4zm2 2v8h10V6H5zm2 1.500l5 2.500-5 2.500v-5z",share:"M10 2l4 4-1.400 1.400L11 5.800V13H9V5.800L7.400 7.400 6 6l4-4zM4 10h2v6h8v-6h2v8H4v-8z",bell:"M10 2c3 0 5 2 5 5v3l2 3v1H3v-1l2-3V7c0-3 2-5 5-5zm-2 14h4a2 2 0 01-4 0z",close:"M16.500 4.900L11.400 10l5.100 5.100-1.400 1.400L10 11.400l-5.100 5.100-1.400-1.400L8.600 10 3.500 4.900l1.400-1.400L10 8.600l5.100-5.100 1.400 1.400z",verified:"M10 2l2 1.600 2.500-.2.9 2.400 2.100 1.400-.7 2.400.7 2.400-2.100 1.400-.9 2.400-2.500-.2L10 18l-2-1.600-2.500.2-.9-2.400L2.500 12.800l.7-2.400-.7-2.400 2.100-1.400.9-2.400 2.500.2L10 2zm-1 9.500L7 9.500 5.900 10.600 9 13.700l5.100-5.100L13 7.500l-4 4z",person:"M10 3a3 3 0 110 6 3 3 0 010-6zm0 8c3.500 0 6 1.500 6 4v2H4v-2c0-2.500 2.500-4 6-4z",crown:"M3 6l3.500 3L10 4l3.500 5L17 6l-1 9H4L3 6z",gamepad:"M5 6h10a4 4 0 014 4v2a3 3 0 01-5 2l-1-1H7l-1 1a3 3 0 01-5-2v-2a4 4 0 014-4zm1 2v1H5v2h1v1h2v-1h1V9H8V8H6zm7 1a1 1 0 100 2 1 1 0 000-2z"}})},9391(e,t,n){var a=n(4848),r=n(6540),i=n(4510),l=n(6942),s=n.n(l);let o=new Set(["display","flexDirection","flexWrap","flexGrow","flexShrink","flexBasis","alignItems","alignSelf","justifyContent","position","padding","margin","fullWidth","fullHeight","width","height","minWidth","background","color","borderRadius","border","overflow","zIndex","textAlign","gap","elevation","ellipsis","attachTop","attachLeft","attachRight","attachBottom"]),d=e=>`${.5*e}rem`,c={base:"var(--color-background-base)",alt:"var(--color-background-alt)","alt-2":"var(--color-background-alt-2)","button-primary":"var(--color-background-button-primary-default)","button-secondary":"var(--color-background-button-secondary-default)","text-base":"var(--color-text-base)","text-alt":"var(--color-text-alt)","text-alt-2":"var(--color-text-alt-2)",live:"var(--color-fill-live)",accent:"var(--color-text-link)","text-link":"var(--color-text-link)",overlay:"var(--color-background-overlay)"},h=e=>c[e]??e;function u(e,t){if(void 0===t)return"";if("number"==typeof t)return`${e}:${d(t)};`;let n=t.top??t.y??0,a=t.right??t.x??0,r=t.bottom??t.y??0,i=t.left??t.x??0;return`${e}:${d(n)} ${d(a)} ${d(r)} ${d(i)};`}let m=(0,i.AH)`
  ${e=>e.position&&`position:${e.position};`}
  ${e=>e.display&&`display:${e.display};`}
  ${e=>e.flexDirection&&`flex-direction:${e.flexDirection};`}
  ${e=>e.flexWrap&&`flex-wrap:${e.flexWrap};`}
  ${e=>void 0!==e.flexGrow&&`flex-grow:${e.flexGrow};`}
  ${e=>void 0!==e.flexShrink&&`flex-shrink:${e.flexShrink};`}
  ${e=>e.flexBasis&&`flex-basis:${e.flexBasis};`}
  ${e=>e.alignItems&&`align-items:${e.alignItems};`}
  ${e=>e.alignSelf&&`align-self:${e.alignSelf};`}
  ${e=>e.justifyContent&&`justify-content:${e.justifyContent};`}
  ${e=>u("padding",e.padding)}
  ${e=>u("margin",e.margin)}
  ${e=>e.fullWidth&&"width:100%;"}
  ${e=>e.fullHeight&&"height:100%;"}
  ${e=>e.width&&`width:${e.width};`}
  ${e=>e.height&&`height:${e.height};`}
  ${e=>e.minWidth&&`min-width:${e.minWidth};`}
  ${e=>e.background&&`background-color:${h(e.background)};`}
  ${e=>e.color&&`color:${h(e.color)};`}
  ${e=>e.borderRadius&&`border-radius:${"rounded"===e.borderRadius?"0.4rem":"large"===e.borderRadius?"0.6rem":"full"===e.borderRadius?"9000px":e.borderRadius};`}
  ${e=>e.border&&`border:${e.border};`}
  ${e=>e.overflow&&`overflow:${e.overflow};`}
  ${e=>void 0!==e.zIndex&&`z-index:${e.zIndex};`}
  ${e=>e.textAlign&&`text-align:${e.textAlign};`}
  ${e=>void 0!==e.gap&&`gap:${d(e.gap)};`}
  ${e=>e.elevation&&`box-shadow:0 ${e.elevation}px ${4*e.elevation}px rgba(0,0,0,0.${Math.min(9,2+e.elevation)});`}
  ${e=>e.ellipsis&&"overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"}
  ${e=>e.attachTop&&"border-top-left-radius:0;border-top-right-radius:0;"}
  ${e=>e.attachBottom&&"border-bottom-left-radius:0;border-bottom-right-radius:0;"}
  ${e=>e.attachLeft&&"border-top-left-radius:0;border-bottom-left-radius:0;"}
  ${e=>e.attachRight&&"border-top-right-radius:0;border-bottom-right-radius:0;"}
`,p=i.Ay.div.withConfig({shouldForwardProp:e=>!o.has(e)})`
  ${m}
`,g=(0,i.Ay)(({className:e,children:t})=>(0,r.cloneElement)(t,{className:s()(t.props.className,e)})).withConfig({shouldForwardProp:e=>"className"===e||"children"===e})`
  ${m}
`;function f({children:e,...t}){return(0,a.jsx)(g,{...t,children:r.Children.only(e)})}let x={1:"1.2rem",2:"1.2rem",3:"1.3rem",4:"1.4rem",5:"1.8rem",6:"2rem",7:"2.4rem",8:"3.6rem"},v=new Set([...o,"fontSize","bold","lines","transform"]),b=i.Ay.p.withConfig({shouldForwardProp:e=>!v.has(e)})`
  font-family: var(--font-base);
  font-size: ${e=>x[e.fontSize??4]};
  ${e=>e.bold&&"font-weight:600;"}
  ${e=>e.transform&&`text-transform:${e.transform};`}
  ${e=>e.lines&&`display:-webkit-box;-webkit-line-clamp:${e.lines};-webkit-box-orient:vertical;overflow:hidden;`}
  ${m}
`,w={primary:{bg:"var(--color-background-button-primary-default)",fg:"var(--color-text-button-primary)",hover:"var(--color-background-button-primary-hover)"},secondary:{bg:"var(--color-background-button-secondary-default)",fg:"var(--color-text-button-secondary)",hover:"var(--color-background-button-secondary-hover)"},text:{bg:"transparent",fg:"var(--color-text-button-text)",hover:"var(--color-background-button-text-hover)"},overlay:{bg:"var(--color-background-button-overlay-default)",fg:"#fff",hover:"var(--color-background-button-overlay-hover)"},alert:{bg:"var(--color-background-button-alert-default)",fg:"#fff",hover:"var(--color-background-button-alert-hover)"}},y=i.Ay.button.withConfig({shouldForwardProp:e=>!["appearance","size","icon","fullWidth","active"].includes(e)})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  cursor: pointer;
  font-family: var(--font-base);
  font-weight: 600;
  white-space: nowrap;
  border-radius: var(--border-radius-medium);
  user-select: none;
  ${e=>{let t=w[e.appearance??"secondary"];return`background-color:${t.bg};color:${t.fg};`}}
  ${e=>{let t=e.size??"default",n="small"===t?"2rem":"large"===t?"4rem":"3rem";return e.icon?`width:${n};height:${n};padding:0;`:`height:${n};padding:0 ${"small"===t?"0.8rem":"1rem"};font-size:${"small"===t?"1.2rem":"1.3rem"};`}}
  ${e=>e.fullWidth&&"width:100%;"}
  &:hover {
    background-color: ${e=>w[e.appearance??"secondary"].hover};
  }
  ${e=>e.active&&"box-shadow: inset 0 0 0 2px var(--color-border-brand);"}
`,j=i.Ay.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;function $({children:e,label:t,...n}){return(0,a.jsx)(f,{flexShrink:0,children:(0,a.jsx)(y,{icon:!0,"aria-label":t,...n,children:(0,a.jsx)(j,{children:e})})})}let S=i.Ay.div`
  display: inline-flex;
  width: ${e=>e.size}px;
  height: ${e=>e.size}px;
  fill: ${e=>e.fill??"currentColor"};
  svg {
    width: 100%;
    height: 100%;
  }
`;function N({path:e,size:t=20,fill:n,viewBox:r="0 0 20 20"}){let i=Array.isArray(e)?e:[e];return(0,a.jsx)(S,{size:t,fill:n,className:"tw-svg",children:(0,a.jsx)("svg",{className:"tw-icon__svg",viewBox:r,width:"100%",height:"100%","aria-hidden":"true",focusable:"false",children:i.map((e,t)=>(0,a.jsx)("path",{d:e,fillRule:"evenodd",clipRule:"evenodd"},t))})})}let P=i.Ay.img`
  display: block;
  max-width: 100%;
`,E=i.Ay.div`
  position: relative;
  flex-shrink: 0;
  width: ${e=>e.size}px;
  height: ${e=>e.size}px;
  border-radius: 9000px;
  overflow: hidden;
  background: var(--color-background-alt-2);
`;function z({src:e,size:t=30,alt:n}){return(0,a.jsx)(E,{size:t,className:"tw-avatar",children:(0,a.jsx)(P,{className:"tw-image-avatar",src:e,alt:n,width:t,height:t})})}let C=i.Ay.div`
  position: fixed;
  z-index: 9999;
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  background: var(--color-background-tooltip);
  color: var(--color-text-tooltip);
  font-size: 1.3rem;
`;function I({label:e,shown:t}){return t?(0,a.jsx)(C,{role:"tooltip",children:e}):null}function k({label:e,children:t}){let[n,i]=(0,r.useState)(!1);return(0,r.isValidElement)(t)?(0,a.jsxs)(a.Fragment,{children:[(0,r.cloneElement)(t,{onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1)}),(0,a.jsx)(I,{label:e,shown:n})]}):t}function M({children:e,fontSize:t=4,...n}){return(0,a.jsx)(p,{children:(0,a.jsx)(b,{fontSize:t,...n,children:(0,a.jsx)("span",{children:e})})})}function L({path:e,label:t,appearance:n="text",size:r=20,onClick:i,target:l}){return(0,a.jsx)(p,{display:"flex",alignItems:"center",children:(0,a.jsx)(k,{label:t,children:(0,a.jsx)($,{appearance:n,label:t,onClick:i,"data-a-target":l,children:(0,a.jsx)(N,{path:e,size:r})})})})}i.Ay.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
`,n.d(t,{Ah:()=>N,K0:()=>L,Sl:()=>f,VJ:()=>M,a2:()=>$,eu:()=>z,m_:()=>k},{L_:P,Ni:b,PE:p,SS:y})},9765(e,t,n){var a=n(7874),r=n(1265),i=n(4319);let l=(0,a.HY)({session:function(e={login:null,displayName:null},t){return e},chatSettings:function(e={showTimestamps:!1,highContrastUsernames:!1,animatedEmotes:!0,theme:"dark"},t){return e},chatRoom:function(e={pauseSetting:"mouseover",isPaused:!1,pauseCount:0,replyTargetId:null},t){switch(t.type){case"chat/pausedChanged":return{...e,isPaused:t.isPaused,pauseCount:e.pauseCount+ +!!t.isPaused};case"chat/replyTargetSet":return{...e,replyTargetId:t.id};default:return e}},ui:i.ui});function s(){return(0,a.y$)(l,(0,a.Tw)(r.A))}n.d(t,{pq:()=>s},{QX:e=>({type:"chat/replyTargetSet",id:e})})},4319(e,t,n){var a=n(1932);let r={sideNavCollapsed:!1,recommendedExpanded:!1};function i(e=r,t){return(0,a.jM)(e,e=>{switch(t.type){case"ui/toggleSideNav":e.sideNavCollapsed=!e.sideNavCollapsed;break;case"ui/toggleRecommendedExpanded":e.recommendedExpanded=!e.recommendedExpanded}})}n.d(t,{ui:()=>i},{Z:()=>({type:"ui/toggleRecommendedExpanded"}),n:()=>({type:"ui/toggleSideNav"})})},625(e,t,n){var a=n(9524),r=n(1358),i=n(4113),l=n(3718);let s=!new URLSearchParams(location.search).has("realtime");function o(e){for(let t of(s&&(0,a.enableVirtualTime)(),e.rooms))(0,r.P3)(t);window.ssrWorkload={nextEvent:i.s,whenIdle:l.dV,async runTimelineStep(t){let n=e.steps.find(e=>e.name===t);if(!n)throw Error(`unknown step ${t}`);let i=e.frames[t];i&&(0,r.Ht)(n.channel,i),(0,a.isVirtualTime)()?await (0,a.advance)(n.durationMs):await new Promise(e=>window.setTimeout(e,n.durationMs)),await (0,l.dV)()}}}n.d(t,{b:()=>o},{x:s})},4113(e,t,n){function a(e,t){window.dispatchEvent(new CustomEvent(`ssr-${e}`,{detail:{targetId:t}}))}function r(e,t){if(!t)return new Promise(t=>window.addEventListener(e,()=>t(),{once:!0}));let n=new Set(t);return new Promise(t=>{let a=r=>{n.delete(r.detail?.targetId??""),n.size||(window.removeEventListener(e,a),t())};window.addEventListener(e,a)})}n.d(t,{W:()=>a,s:()=>r})},3718(e,t,n){var a=n(9524);let r=null;function i(e){r=e._internalRoot}let l=new Set,s=0;function o(e){l.add(e),s++;let t=()=>{l.delete(e)};return e.then(t,t),e}async function d(){for(;;){let e=s;for(;l.size;)await Promise.allSettled([...l]);if(await (0,a.whenTimersIdle)(),await (0,a.nextTask)(),await (0,a.nextTask)(),function(){let e=!r||0===r.pendingLanes&&null===r.callbackNode;return 0===l.size&&!(0,a.hasDueTimers)()&&e}()&&s===e)return}}n.d(t,{dV:()=>d,th:()=>i,u4:()=>o})},379(){},404(e){e.exports=JSON.parse('{"BM":{"lumenfall":{"roomId":"431872590","profile":"en","roomState":{"followers-only":"10","slow":"0"}},"rioazul":{"roomId":"287340615","profile":"pt","roomState":{"followers-only":"0","slow":"0"}}},"Ci":[{"name":"LoadChannel","channel":"lumenfall","durationMs":1000,"rate":0,"mix":null},{"name":"ChatFill","channel":"lumenfall","durationMs":3000,"rate":50,"mix":"typical"},{"name":"ChatBurst1","channel":"lumenfall","durationMs":1000,"rate":50,"mix":"typical"},{"name":"ChatBurst2","channel":"lumenfall","durationMs":1000,"rate":50,"mix":"emote-heavy"},{"name":"ChatBurst3","channel":"lumenfall","durationMs":1000,"rate":50,"mix":"replies-mentions"},{"name":"ChatBurst4","channel":"lumenfall","durationMs":1000,"rate":50,"mix":"sub-train"},{"name":"ChatBurst5","channel":"lumenfall","durationMs":1000,"rate":50,"mix":"moderation"},{"name":"ChatBurst6","channel":"lumenfall","durationMs":1000,"rate":50,"mix":"typical"},{"name":"PauseChat","channel":"lumenfall","durationMs":200,"rate":0,"mix":null},{"name":"ChatWhilePaused","channel":"lumenfall","durationMs":1000,"rate":50,"mix":"typical"},{"name":"ResumeChat","channel":"lumenfall","durationMs":200,"rate":0,"mix":null},{"name":"SwitchChannel","channel":"rioazul","durationMs":1000,"rate":0,"mix":null},{"name":"ChatBurst7","channel":"rioazul","durationMs":3000,"rate":50,"mix":"typical"},{"name":"ChatBurst8","channel":"rioazul","durationMs":1000,"rate":50,"mix":"typical"}]}')}},function(e){e.O(0,[190,474],function(){return e(e.s=5557)}),e.O()}]);
//# sourceMappingURL=core-6e0a826f4831e5de.js.map