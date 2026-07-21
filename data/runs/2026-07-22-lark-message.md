# Daily AI Native Product Radar - 2026-07-22 Lark Delivery Retry

Status: Feishu/Lark group delivery not completed.

Target chat: mjf-开发with Codex记录群
chat_id: oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f
Identity: user
Idempotency key: daily-ai-native-radar-20260722-v1

Failure:
- lark-cli returned missing user scope: im:message.send_as_user
- CLI update notice: current 1.0.49, latest 1.0.72

Recovery:
1. Re-run a fresh authorization flow, because device-code URLs must not be cached:
   lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
2. Generate and open the QR/verification URL returned by that command.
3. After authorization completes, run the device-code completion command from the same fresh flow.
4. Retry send:
   lark-cli im +messages-send --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f --as user --markdown "$(cat data/runs/2026-07-22-lark-message.md)" --idempotency-key daily-ai-native-radar-20260722-v1

Message body to send:

---

# Daily AI Native Product Radar - 2026-07-22

GitHub Pages 主链路已更新并推送。

- Top 项目：8 个
- Watchlist：6 个
- Snapshot：43 runs / 662 projects / 799 history entries
- 最新窗口：2026-07-19 00:00 to 2026-07-22 01:36 Asia/Shanghai
- GitHub Pages：https://brocademaple.github.io/ai-daily-product-radar/

Top 3：
1. Blaizzy/nativ - native macOS local AI app，542 stars
2. eli-labz/Agent-Execution-Partnership - agent action authorization/control plane
3. Kritt-ai/open-kritt - AI security agent workbench

今日趋势：local native AI apps、agent execution authorization、安全/漏洞 agent workbench、cross-channel agent identity、multi-agent operator console。

本轮未 clone/install/run 第三方仓库；可运行性基于 GitHub metadata、README/root contents、docs、Docker/build/package/test signals 判断。
