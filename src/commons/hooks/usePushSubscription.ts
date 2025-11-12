import { useCallback } from "react";

const PUBLIC_VAPID_KEY = process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY || "";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function usePushSubscription() {
  const subscribeToPush = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) {
      console.warn("Service Worker is not supported");
      return;
    }
    if (!("Notification" in window)) {
      console.warn("Notifications are not supported");
      return;
    }
    if (!PUBLIC_VAPID_KEY) {
      console.warn("Missing NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY");
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    if (Notification.permission === "denied") {
      alert(
        "알림 권한이 차단되어 있습니다. 브라우저 설정에서 허용으로 변경해주세요."
      );
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("알림 권한이 허용되지 않았습니다.");
      return;
    }

    const existing = await registration.pushManager.getSubscription();
    if (existing) {
      console.log("이미 구독 중입니다.");
      return existing;
    }

    const convertedKey = urlBase64ToUint8Array(PUBLIC_VAPID_KEY);
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedKey,
    });

    await fetch("/api/push/save-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription),
    });

    console.log("푸시 구독 완료");
    return subscription;
  }, []);

  const unsubscribeFromPush = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const registration = await navigator.serviceWorker.ready;
    const existing = await registration.pushManager.getSubscription();

    if (existing) {
      await existing.unsubscribe();
      await fetch("/api/push/remove-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: existing.endpoint }),
      });
      console.log("푸시 구독 해제 완료");
    }
  }, []);

  return { subscribeToPush, unsubscribeFromPush };
}
